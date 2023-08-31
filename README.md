# Враппер НГТК API.
Неофициальный враппер API НГТК от одного студента для студентов.

## Установка
* npm - `npm install nggtk-api`
* yarn - `yarn add nggtk-api`

## Пример
```js
const Nggtk = require("nggtk-api")

const nggtk = new Nggtk("URI_QUERY") // В ином случае, будет выводиться ошибка "Sender's signature is not correct".

await nggtk.getUserInfo()
```

## Как получить URI_QUERY?
1. Перейдите в приложение АИС SFM 2 через мобильную версию сайта ВКонтакте
2. Откройте `DevTools`
3. Откройте вкладку `Network`
4. Выберите `Fetch/XHR`
5. Найдите пункт, начинающийся с `?vk_access_token_settings=`
6. Скопируйте весь текст, находящийся после `https://nggtk.ru/api/v2/METHOD_NAME/?`

## Список методов
### Nggtk.checkUserVK()
* Проверка на то, что студент является пользователем ВКонтакте.
```js
await nggtk.checkUserVK()
```

### Nggtk.getUserInfo()
* Получение информации о студенте.
```js
await nggtk.getUserInfo()
```

### Nggtk.getTopBRSStudents()
* Получение топа студентов по баллам.
```js
await nggtk.getTopBRSStudents()
```

### Nggtk.getNews()
* Получение новостей.
```js
await nggtk.getNews()
```

### Nggtk.getAllNews()
* Получение всех новостей.
```js
await nggtk.getAllNews()
```

### Nggtk.getSlider()
* Получение слайдов с главной страницы.
```js
await nggtk.getSlider()
```

### Nggtk.getMyNotifications(type)
* Получение количества/? уведомлений.
```js
const type = "count"
await nggtk.getMyNotifications(type)
```
> Я без понятия, что может быть ещё.

### Nggtk.getNewspaper()
* Получение газеты с главной страницы.
```js
await nggtk.getNewspaper()
```

### Nggtk.getAllEvents()
* Получение всех мероприятий.
```js
await nggtk.getAllEvents()
```

### Nggtk.getSchedule(group)
* Получение количества/? уведомлений.
```js
const group = "10ПК1"
await nggtk.getSchedule(group)
```

### Nggtk.getTeachers(groupId)
* Получить преподавателей определённой группы.
```js
const groupId = 900000
await nggtk.getTeachers(groupId)
```

### Nggtk.changeNotifyScheduleState(value)
* Получать ли уведомления о изменении расписания?
```js
const value = true
await nggtk.changeNotifyScheduleState(value)
```

### Nggtk.getInfoPoints()
* Получение сводки баллов студента.
```js
await nggtk.getInfoPoints()
```

### Nggtk.getInfoPoints()
* Получение сводки баллов студента.
```js
await nggtk.getInfoPoints()
```

### Nggtk.getEventInfo(groupId)
* Получить преподавателей определённой группы.
```js
const groupId = 5
await nggtk.getEventInfo(id)
```

### Nggtk.getPortfolio()
* Получение портфолио студента.
```js
await nggtk.getPortfolio()
```

### Nggtk.getEvents()
* Получение мероприятий, в которых участвовал студент.
```js
await nggtk.getEvents()
```

### Nggtk.getExpelled()
* Получение информации о том, отчислен ли студент.
```js
await nggtk.getExpelled()
```
> Чую, что у меня скоро будет 1.

### Nggtk.getAttendaceStudentInfo(action, period)
* Получение сводки о посещаемости студента.
```js
const action = "TrafficPeriod"
const peiod = "ThisWeek"
await nggtk.getAttendaceStudentInfo(action, period)
```
Возможные action: 
1. DetailedAttendance - Детальная посещаемость.
> Необходимо в period указывать дату, за которую надо получить сводку (ДД.ММ.ГГГГ)

2. TrafficPeriod - Посещаемость за период.
> Необходимо в period указывать `ThisWeek` (за эту неделю), `ThisMonth` (за этот месяц), `FirstSemester` (первый семестр), `SecondSemester` (второй семестр)

## Полезные ссылки
* [Сайт НГТК](https://nggtk.ru/)