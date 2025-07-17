import styled from "styled-components";
const Container = styled.div`
  width: 100%;
  height: ${(props) => props.height || "300px"};
  position: relative;
  overflow: hidden;
`;
const BlurredBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.src ? `url(${props.src})` : "transparent")};
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  filter: blur(10px);
  transform: scale(1.1);
`;
const MainMedia = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => (props.src ? `url(${props.src})` : "transparent")};
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  display: ${(props) => (props.isVideo ? "none" : "block")};
`;
const VideoPlayer = styled.video`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: ${(props) => (props.isVideo ? "block" : "none")};
`;
const ImageDisplay = ({ imageUrl, height }) => {
  const isVideo = imageUrl && imageUrl?.includes("/video/");
  return (
    <Container height={height}>
      <BlurredBackground src={imageUrl} />
      <MainMedia src={imageUrl} isVideo={isVideo} />
      {isVideo && (
        <VideoPlayer
          src={imageUrl}
          autoPlay
          loop
          muted
          playsInline
          isVideo={isVideo}
        />
      )}
    </Container>
  );
};

export default ImageDisplay;
