# Warehouse-Frontend

## Design Decisions for Frontend
- This table below shows the comparison between some technologies that can be used for the frontend:
  |  | jQuery | Angular | React | Vue |
  | ------ | ------ | ------ | ------ | ------ |
  | Trend [[8][8]] | Most popular, but going downward | The third most popular | The second most popular, overtook angular in 2018 | The least popular |

## Assumptions
There are some assumptions related to the assignment description:
- Since the product in inventory.json does not contain price, the product price is set from the warehouse software.
- The product price has only one currency.
- The product price is not defined based on region.
- The product list does not have prioritization when showing the possible quantity.
- Each product shows its quantity without considering the other product.
- Primary key and Stock columns would be better to be set as Long/BigInt so that it can cover more rows.
- Multiple products can have the same names.
- When user sells the product, the system does not delete the product from database. The system only updates the available stock of the article.

## Compromises
- No DeletionDate in the table. **Future implementation**: set DeletionDate column in every tables, set store procedure that update the DeletionDate whenever DELETE query is executed. This is the best practice since it can cover up the data when things go messed up with our data.
- No spring hateoas since it is not mandatory.
- Upload Article stops when there is a value is duplicate. **Future implementation**: implement Upsert
- Upload Product ignores article that does not exists. **Future implementation**: implement Upsert
- No variable/entity validation in the backend and database layers due to the limited development time. Currently, only the UI layer that has the validation.
- No Pagination on the REST API.
- No chained transaction covering in the backend.
- No jwt token expiration date validation. **Future implementation**: implement token expiration date.
- The unit tests only cover the "happy" scenario due to limited time. The main goal is to show that the units are testable to fulfill one of the non-functional requirements, which is testability.
- No user manual for the API

# Testing Result
- Tested the frontend in Chrome Version 92.0.4515.107 (Official Build) (64-bit) and Mozilla version 90.0.2 (64-bit)

[1]: https://www.techempower.com/benchmarks/#section=data-r17&hw=ph&test=fortune
[2]: https://www.programmersought.com/article/76251137603/
[3]: https://techradar.ingka.com/
[4]: https://www.tutorialsteacher.com/mvc/asp.net-mvc-version-history
[5]: https://mvnrepository.com/artifact/org.springframework/spring-webmvc
[6]: https://mvnrepository.com/artifact/org.springframework/spring-webflux
[7]: https://itembase.com/resources/blog/tech/spring-boot-2-spring-webflux
[8]: https://trends.google.com/trends/explore?cat=31&date=today%205-y&q=vue,react,angular,jquery