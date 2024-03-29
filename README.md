# Bulletin board

### Команды

#### Запуск проекта

    npm start

#### Сборка проекта

    npm run build

#### Запуск тестов

    npm run test

### Задание

#### Разработать упрощенную версию сайта Авито

На странице показывается список объявлений, загружаемых по API. Ссылки доступны по адресу https://avito.dump.academy.

#### Каждое объявление отображается в виде блока, который содержит:

- заголовок объявления;
- главное фото (первое в списке) + количество дополнительных;
- цену (каждые 3 разряда разделять пробелом);
- имя продавца и его рейтинг.

#### Фильтровать объявления можно:

- по категории (недвижимость — `immovable`, фотоаппараты — `cameras`, автомобили — `auto`, ноутбуки — `laptops`);
- по цене (возможность ввести цену «с» и «до»);
- по избранным объявлениям.

#### Сортировать объявления можно:

- по популярности - по рейтингу продавца;
- по возрастанию цены (от меньшей к большей);

#### Избранное

Любое объявление можно добавить в избранное. Список избранных объявлений хранятся в браузере и не синхронизируются с сервером. Способ хранения произвольный, но реализован таким образом, чтобы при перезагрузке страницы данные не терялись.

#### Дизайн и технологии

Дизайн, framework и библиотеки могут быть выбраны на ваше усмотрение. Финальную версию разработанного приложения выложить на github.com.
