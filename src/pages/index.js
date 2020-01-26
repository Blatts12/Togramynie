import Container from "react-bootstrap/Container";
import MainPageHeader from "../components/MainPageHeader";
import MainPageFooter from "../components/MainPageFooter";
import MainPageContent from "../components/MainPageContent";

function Index() {
  return (
    <Container>
      <MainPageHeader/>
      <MainPageContent/>
      <MainPageFooter/>
    </Container>
  );
}

export default Index;
