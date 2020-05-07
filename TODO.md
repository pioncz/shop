Koszyk:
- Dodawanie produktu do koszyka na kazdym widoku
- Widok listy koszyka w navbarze
- Podstrona koszyka -> mozliwosc przejscia dalej
- Formularz adresowy
- Platnosc (zamockowana)

Search:
+Wybór kategorii (kategorie z serwera)
+loader: czeka na products i categories
Paginacja
Po kliknieciu w kafel przejscie do podstrony produktu
search onChange z debouncem

Store promotion: produkty pobierane i wrzucane do stora produktow. Test czy zadziala jak produkty beda w storze

Admin panel

###

Dodatkowo:
- deployment https://vuejs.org/v2/guide/deployment.html
- accessibility?
- sprawdzanie typow
- do opisow jakis rich text editor
- popup newsletterowy
- uzycie slota
- globalny interceptor do bledow
- walidacja formularza
- przyklad wykorzystania gettera w vuex
- pokazac drugi rodzaj loadera (ladujacy sie szkielet tresci https://github.com/zalog/placeholder-loading)
- vue cli (jak ulatwic sobie zycie?)

Wstawki opisowe:
- AppComponent, TheComponent, SuperComponent
- w idealnym swiecie serwer wystawi dobre api, ale czesto trzeba robic dodatkowe rzeczy
- w zaleznosci od potrzeb nie trzeba za kazdym razem czyscic danych ktore juz pobralismy raz od serwera
- info do eslinta: w pewnym momencie zacznie nam przeszkadzac w trakcie developmentu i lepiej go dodac do np jako githook i wykonywac lintera np przed commitem lub mergem do developa
- vuex strict mode - do obserwowania niepozadanych zmian store'a
- inne stylowanie: bootstrap, material
- 