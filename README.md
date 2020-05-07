# Пример публичной таблицы

В приложение принимается ссылка на публичную Google Spreadsheet страницу, ее название и загружается JSON-файл определенного формата. Приложение предоставляет интерфейс для изменения значений из JSON-файла выбранными значениями из таблицы.


### Пример принимаемых данных:  
  
##### Публичная таблица:

Ссылка: 
```
https://docs.google.com/spreadsheets/d/19Dus79rjiH2WIwDzwnOByMMXo1boFt9ASC7CX4u7dv8/edit?usp=sharing
```

Название таблицы: 
```
1
```

Пример JSON-файла находится в корневом разделе репозитория: [example.json](https://github.com/grangegrange/spreadsheet2json/blob/master/example.json).



### Установка

Это простое React-приложение на create-react-app, процесс установки стандартный.

Склонируйте репозиторий:
```
git clone https://github.com/grangegrange/spreadsheet2json.git
```    

Перейдите в директорию с проектом:
```
cd spreadsheet2json/
```
  
Установите зависимости:
```
npm install --save
```

Запустите приложение:
```
npm run start
```