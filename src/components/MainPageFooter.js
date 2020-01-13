import Container from "react-bootstrap/Container";

export default function MainPageFooter() {
  return (
    <Container>
    <footer className="page-footer font-small teal pt-4">
        <div className="container-fluid text-center text-md-left">
            <div className="row">
                <div className="col-md-6 mt-md-0 mt-3">
                    <h5 className="text-uppercase font-weight-bold">O stronie</h5>
                    <p>Strona została stworzona w celu ułatwienia i przyśpieszenia procesu obliczania statystyk i punktów w grach planszowych oraz karcianych, 
                        poprzez udostępnienie internetowego licznika punktów lub statystyk z wykorzystaniem template-ów.</p>
                </div>
                <div className="col-md-6 mb-md-0 mb-3">
                    <h5 className="text-uppercase font-weight-bold">Kontakt</h5>
                    <p>W celu skontaktowania się z twórcami tej strony internetowej użyj jednego z poniższych adresów e-mail:
                        <ul className="list-unstyled">
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