import Recent from "../component/Recent";
import Header from "../component/Header";
import Community from "../component/Community/Community";
import Popular from "../component/Popular";
import FileUpload from "../component/FileUpload";

export default function Fileload() {
    return (
      <>
        <Header />
        <Community />
        <Recent />
        <Popular />
        <FileUpload />
      </>
    );
  }
