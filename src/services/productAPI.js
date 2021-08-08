import {SERVER_URL} from "./config";


class ProductAPI {

    constructor() {
        this.token = sessionStorage.getItem("jwt");
    }

    async fetchProductDetail (productId) {
        const result = fetch(SERVER_URL + 'product-details/' + productId,
                    {
                            headers: {'Authorization': this.token}
                        })
                        .then((response) => response.json());
        return result;
    }
}
export default ProductAPI;