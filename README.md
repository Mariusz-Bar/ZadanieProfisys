<h2>Celem zadania jest stworzenie aplikacji desktopowej lub webowej opartej na platformie .NET, która
powinna spełniać następujące zadania:</h2><br>
• Import danych z plików CSV umieszczonych w katalogu z zadaniem, a następnie zapisanie ich
do bazy danych. Plik Documents.csv zawiera rekordy reprezentujące dokumenty, a plik
DocumentItems.csv zawiera rekordy reprezentujące pozycje dokumentów z poprzedniego
pliku.<br>
• Pobranie danych z bazy danych i wyświetlenie ich w aplikacji. Najlepiej aby dokumenty zostały
zaprezentowane w formie tabelarycznej, wraz z możliwością podejrzenia konkretnego
dokumentu wraz z jego pozycjami. <br> <br>
<h2>Uwagi:</h2><br>
• Konkretna platforma na której będzie zbudowana aplikacja jest dowolna (np. WPF, WinForms,
WinUI, ASP .NET MVC, ASP .NET Web API + JS Framework itd.). Ważne aby aplikacja
posiadała interfejs graficzny, który pozwoli użytkownikowi na import oraz odczytanie danych.<br>
• Dane muszą być przechowywane w relacyjnej bazie danych (np. Microsoft SQL Server lub
SQLite).<br>
• W aplikacji można wykorzystać paczki NuGet dostępne na nuget.org.<br>
• Aplikacja powinna prezentować umiejętności autora, dlatego warto używać dobrych praktyk
wytwarzania oprogramowania, wzorców projektowych itp. Aplikację oczywiście można
wzbogacić o inne funkcjonalności o których nie wspomniano wyżej jak np. filtrowanie
wyświetlanych danych (na pewno zadziała to na plus przy ocenianiu).<br>
• Gotowy projekt należy udostępnić w serwisie GitHub, a link do repozytorium przesłać w
wiadomości e-mail na adres, który przesłał zadanie do wykonania.<br><br>

<h2>Aplikacja została napisana w ASP.NET Web API (.NET 6) + Angular (v16) </h2>
<h3>Instrukcja uruchomienia projektu</h3>
<h4>Konfiguracja bazy danych:</h4>
Po uruchomieniu projektu (ZadanieProfisysWebApi) w Visual Studio należy w Package Manager Console wpisać komendę: <b>dotnet ef database update</b>, aby baza została stworzona. W razie potrzeby można zmienić ConnectionString w pliku appsettings.json <br>
<h4>Instalowanie zależności w Angular:</h4>
Po uruchomieniu projektu (ZadanieProfisysFrontend) w Visual Studio Code należy otworzyć terminal projektu i wpisać komendę: <b>npm install</b>. Gdy zależności zostaną zainstalowane można uruchomić projekt przez komendę: <b>ng serve</b><br>
<h4>Uruchomienie aplikacji:</h4>
Gdy backend oraz frontend zostanie uruchomiony, należy w przeglądarce wejść na adres: <b>http://localhost:4200/</b>

<h3>Funkcje aplikacji:</h3>
- Import danych z plików zapisanych w katalogu projektu<br>
- Import danych z własnych plików<br>
- Usuwanie danych z bazy<br>
- Filtrowanie rekordów<br>
- Sortowanie rekordów przez kliknięcie w nazwę kolumny<br>
- Wybór ilości wyświetlanych elementów na stronie<br>
