module 0xc233e2fccc71ea3c6c104b46933e0b8c95e655abd423bd612524f6067c2887ef::TreePlantation {
    use std::string::String;
    use std::vector;

    struct TreeRecord has key, store {
        id: u64,
        species: String,
        latitude: u64,
        longitude: u64,
        planter: address,
    }

    struct TreePlantation has key {
        trees: vector<TreeRecord>,
        next_id: u64,
    }

    public fun initialize(account: &signer) {
        move_to(account, TreePlantation {
            trees: vector::empty(),
            next_id: 0,
        });
    }

    public fun plant_tree(account: &signer, species: String, latitude: u64, longitude: u64) acquires TreePlantation {
        let plantation = borrow_global_mut<TreePlantation>(signer::address_of(account));
        let id = plantation.next_id;
        
        let tree = TreeRecord {
            id,
            species,
            latitude,
            longitude,
            planter: signer::address_of(account),
        };

        vector::push_back(&mut plantation.trees, tree);
        plantation.next_id = id + 1;
    }

    public fun get_tree_count(): u64 acquires TreePlantation {
        let plantation = borrow_global<TreePlantation>(signer::address_of(account));
        vector::length(&plantation.trees)
    }

    public fun get_tree(index: u64): (u64, String, u64, u64, address) acquires TreePlantation {
        let plantation = borrow_global<TreePlantation>(signer::address_of(account));
        let tree = vector::borrow(&plantation.trees, index);
        (tree.id, tree.species, tree.latitude, tree.longitude, tree.planter)
    }
}
