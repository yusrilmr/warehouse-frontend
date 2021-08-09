import {SERVER_URL} from "./config";


class ArticleAPI {

    constructor() {
        this.token = sessionStorage.getItem("jwt");
    }

    async fetchArticles () {
        const result = fetch(SERVER_URL + 'articles/',
                    {
                            headers: {'Authorization': this.token}
                        })
                        .then((response) => response.json());
        return result;
    }

    async deleteArticle (articleId) {
        const result = fetch(SERVER_URL + 'articles/' + articleId,
                    {
                            method: 'DELETE',
                            headers: {'Authorization': this.token}
                        });
        return result;
    }

    async insertArticle (article) {
        const result = fetch(SERVER_URL + 'articles',
                    {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': this.token
                            },
                            body: JSON.stringify(article)
                        });
        return result;
    }

    async updateArticle (id, article) {
        const result = fetch(SERVER_URL + 'articles/' + id,
                    {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': this.token
                            },
                            body: JSON.stringify(article)
                        });
        return result;
    }

    async uploadArticleFile (fileContent) {
        const result = fetch(SERVER_URL + 'articles/upload',
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
export default ArticleAPI;