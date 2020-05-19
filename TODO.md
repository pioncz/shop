deployment https://vuejs.org/v2/guide/deployment.html

PopupButton vs AppPopupButton?

testowanie:
- end to end
- vuex store

style dolaczyc jako import w main.scss, opisac jak robic style w komponencie

pisac komponenty z vstore2 - do przemyslenia

###

Wstawki opisowe:
- korzystam ze skroconych wersji bindow v-on: => @ oraz v-bind: :
- propsy: w razie potrzeby mozna uzyc sprawdzanie po typie klasy / uzyc wlasnego walidatora
- click-outside docelowo lepiej skorzystac z gotowca: vue-click-outside ktory jest lepszy
- pokazac drugi rodzaj loadera
- info płatności: adyen, stripe, paypal
- info accessibility to osobny rozdział
- unikac contenteditable - vue nie za dobrze sobie radzi z aktualizowaniem stanu
- AppComponent, TheComponent, SuperComponent
- w idealnym swiecie serwer wystawi dobre api, ale czesto trzeba robic dodatkowe rzeczy
- w zaleznosci od potrzeb nie trzeba za kazdym razem czyscic danych ktore juz pobralismy raz od serwera
- Vue.config.productionTip = false;
- eslint setup: vue.config.js  lintOnSave: false, a eslint dolaczyc do builda za pomoca github actions albo np pre-commit git hooks
- vuex strict mode - do obserwowania niepozadanych zmian store'a
- warte sprawdzenia biblioteki ui: 
https://element.eleme.io/
https://vuetifyjs.com