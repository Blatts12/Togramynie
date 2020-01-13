import Container from "react-bootstrap/Container";
import Logo from "../static/logo.svg";

export default function MainPageHeader() {
    return (
        <Container>
        <div className="container-fluid text-center text-md-center">
        <Logo/>
        </div>
        </Container>
    );
}