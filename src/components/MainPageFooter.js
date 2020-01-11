import Container from "react-bootstrap/Container";

export default function MainPageFooter() {
  return (
    <Container>
    <footer class="page-footer font-small teal pt-4">
        <div class="container-fluid text-center text-md-left">
            <div class="row">
                <div class="col-md-6 mt-md-0 mt-3">
                    <h5 class="text-uppercase font-weight-bold">O stronie</h5>
                    <p>Strona została stworzona w celu ułatwienia i przyśpieszenia procesu rozgrywki w gry planszowe lub karciane, 
                        poprzez udostępnienie internetowego licznika punktów lub statystyk z wykorzystaniem template-ów.</p>
                </div>
                <div class="col-md-6 mb-md-0 mb-3">
                    <h5 class="text-uppercase font-weight-bold">Kontakt</h5>
                    <p>W celu skontaktowania się z twórcami tej strony internetowej użyj jednego z poniższych adresów e-mail:
                        <ul class="list-unstyled">
                            <li><a href="mailto:example@gmail.com">example@gmail.com</a></li>
                            <li><a href="mailto:example2@gmail.com">example2@gmail.com</a></li>
                        </ul>
                    </p>
                </div>
            </div>
        </div>
        
        <div class="footer text-center py-3">
            <p>2020 Project: Advanced Object Oriented Programming</p>
        </div>
    </footer>
    </Container>
  );
}