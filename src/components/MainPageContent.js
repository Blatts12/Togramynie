import Container from "react-bootstrap/Container";

export default function MainPageContent() {
  return (
    <Container>
        <div className="container-fluid text-center text-md-center">
            <p>Lubisz grać w gry planszowe ale męczą cię dołączone do nich liczniki punktów lub statystyk? 
                Któryś z twoich znajomych ma problem z policzeniem zadawanych obrażeń w grze karcianej lub zabiera to zbyt dużo czasu?
                Nie chcesz uszkodzić dołączonych do gry liczników lub gdzieś ich zgubić?
                Jeżeli odpowiedź na któreś z powyższych pytań była pozytywna to ta strona jest właśnie dla ciebie!</p>
            <h5 className="text-uppercase font-weight-bold">DZIAŁANIE W KILKU KROKACH</h5>
            <ul className ="list-inline mx-auto justify-content-center">
              <li>Utwórz pokój.</li>
              <li>Zgromadź znajomych.</li>
              <li>Wybierz szablon odpowiedni do gry, w którą chcesz zagrać.</li>
              <li>Wyznaczcie pierwszego gracza.</li>
              <li>I niech rozpocznie się rozgrywka!!!</li>
            </ul>
        </div>
    </Container>
  );
}