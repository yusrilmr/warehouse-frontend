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

    async fetchProductQuantities () {
        const result = fetch(SERVER_URL + 'product-quantities/',
                    {
                            headers: {'Authorization': this.token}
                        })
                        .then((response) => response.json());
        return result;
    }

    async insertProduct (product) {
        const result = fetch(SERVER_URL + 'products',
                    {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': this.token
                            },
                            body: JSON.stringify(product)
                        });
        return result;
    }

    async updateProduct (productId, product) {
        const result = fetch(SERVER_URL + 'products/' + productId,
                    {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': this.token
                            },
                            body: JSON.stringify(product)
                        });
        return result;
    }

    async sellProduct (productId, total) {
        const result = fetch(SERVER_URL + 'products/sell/' + productId + '/' + total,
                    {
                            method: 'PUT',
                            headers: {'Authorization': this.token}
                        });
        return result;
    }

    async deleteProduct (productId) {
        const result = fetch(SERVER_URL + 'products/' + productId,
                    {
                            method: 'DELETE',
                            headers: {'Authorization': this.token}
                        });
        return result;
    }

    async deleteProductArticle (productArticleId) {
        const result = fetch(SERVER_URL + 'product-articles/' + productArticleId,
                    {
                            method: 'DELETE',
                            headers: {'Authorization': this.token}
                        });
        return result;
    }

    async uploadProductFile (fileContent) {
        const result = fetch(SERVER_URL + 'products/upload',
                    {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': this.token
                            },
                            body: fileContent
                        });
        return result;
    }
}
export default ProductAPI;