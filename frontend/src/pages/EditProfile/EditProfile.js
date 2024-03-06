import { useContext, useEffect, useRef, useState } from "react";
import userImg from "../../images/posts_img/post_img4.jpg";
import styled from "@emotion/styled";
import { Context } from "../../shared/Context";
import { Avatar, Box, Button, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import ReactCrop, {
  centerCrop,
  convertToPercentCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPriview from "../../shared/setCanvasPreview";

const Container = styled("div")`
  display: flex;
  width: 100%;
  min-height: 100%;
`;

const EditMainInfo = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid #363738;
  border-radius: 12px;
  overflow: hidden;
  gap: 12px;
  padding: 16px 20px;
`;

const InfoContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 12px;
  min-height: 56px;
  width: 100%;
`;

const InfoTitle = styled("div")`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 30%;
  color: #828282;
  text-align: center;
  font-family: Roboto;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
`;

const InfoForChange = styled("div")`
  width: 60%;
`;

const InputInfo = styled("input")`
  outline: none;
  width: 100%;
  padding: 8px;
  height: ${({ height }) => height};
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  border-radius: 8px;
  color: ${(props) => props.theme.palette.primary.grey[1]};
`;

const HR = styled("div")`
  width: 100%;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.08);
`;

const SaveChangesBtn = styled("div")`
  cursor: pointer;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  padding: 8px 16px 8px 16px;
  max-width: 200px;
  border-radius: 8px;
  &:hover {
    background-color: ${(props) => props.theme.palette.primary.grey[4]};
  }
`;

const StyledInputFile = styled("input")``;

const ASPECT_RATIO = 1;
const MIN_DEMENSION = 150;

const EditProfile = () => {
  const [date, setDate] = useState("2022-04-17");
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState("");
  const [imgError, setImgError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [newAvatar, setNewAvatar] = useState(null)

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    document.title = "Editing my profile";
  }, []);
  const currentUserContext = useContext(Context);
  const { currentUser, setCurrentUser, userInit } = currentUserContext;

  const onChangeDate = (e) => {
    // const newDate = new Date(e.target.value);
    setDate(e.target.value);
    console.log(date); //value picked from date picker
  };

  const onSelectFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.addEventListener("load", () => {
      const imageElement = new Image();
      const imageURL = reader.result?.toString() || "";
      imageElement.src = imageURL;
      imageElement.addEventListener("load", (e) => {
        if (imgError) setImgError("");
        const { naturalWidth, naturalHeight } = e.currentTarget;
        if (naturalWidth < MIN_DEMENSION || naturalHeight < MIN_DEMENSION) {
          setImgError("The image must be least 150x150 pxs");
          return setImgSrc("");
        }
      });
      console.log(imageURL);
      setImgSrc(imageURL);
    });
    reader.readAsDataURL(file);
  };

  const imageOnLoad = (e) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DEMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const updateAvatar = (dataURL) => {
    console.log(dataURL)
    setNewAvatar(dataURL)
  };

  let avatarFullPath =
    `http://localhost:8000/${currentUser?.images.avatar}` || userImg;

  return (
    <Container>
      <EditMainInfo>
        <Avatar
          alt="user-avatar"
          src={newAvatar || avatarFullPath || null}
          sx={{
            width: "112px",
            height: "112px",
            border: (theme) => "1px solid" + theme.palette.primary.grey[5],
          }}
        ></Avatar>
        <Button onClick={handleOpenModal}>Upload a new image</Button>
        <Modal
          keepMounted
          open={openModal}
          onClose={() => {
            handleCloseModal();
            setImgSrc("");
            setImgError("");
          }}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: "90vh",
              width: 700,
              backgroundColor: (theme) => theme.palette.primary.grey[6],
              border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
              }}
            >
              Upload a new photo
            </Typography>
            <StyledInputFile
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              sx={{
                width: "100%",
              }}
            ></StyledInputFile>
            {imgError && (
              <Typography
                sx={{
                  color: (theme) => theme.palette.primary.red[1],
                }}
              >
                {imgError}
              </Typography>
            )}
            {imgSrc && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Box // контейнер для картинки с обрезкой и канваса
                  sx={{
                    display: "flex",
                    gap: "12px",
                  }}
                >
                  <ReactCrop
                    crop={crop}
                    circularCrop
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DEMENSION}
                    onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
                  >
                    <img
                      ref={imgRef}
                      src={imgSrc}
                      alt="Upload"
                      style={{ maxHeight: "50vh" }}
                      onLoad={imageOnLoad}
                    ></img>
                  </ReactCrop>
                  {crop && (
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        display: "none",
                        width: 150,
                        height: 150,
                        objectFit: "contain",
                        backgroundColor: (theme) =>
                          theme.palette.primary.grey[5],
                        border: (theme) =>
                          `1px solid ${theme.palette.primary.grey[3]}`,
                      }}
                    ></canvas>
                  )}
                </Box>
                <Button
                  variant="outlined"
                  sx={{
                    border: (theme) =>
                      `1px solid ${theme.palette.primary.grey[3]}`,
                  }}
                  onClick={() => {
                    setCanvasPriview(
                      imgRef.current,
                      previewCanvasRef.current,
                      convertToPixelCrop(
                        crop,
                        imgRef.current.width,
                        imgRef.current.height
                      )
                    );
                    const dataURL = previewCanvasRef.current.toDataURL();
                    updateAvatar(dataURL);
                    handleCloseModal()
                    setImgSrc("");
                  }}
                >
                  Crop and save
                </Button>
              </Box>
            )}
          </Box>
        </Modal>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <InfoContainer>
            <InfoTitle>Name:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"32px"}
                type="text"
                placeholder="Some info about you"
                value={(currentUser && currentUser.primary.name) || ""}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>Surname:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"32px"}
                type="text"
                placeholder="Some info about you"
                value={(currentUser && currentUser.primary.surname) || ""}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
        </Box>
        <HR></HR>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <InfoContainer>
            <InfoTitle>A short information:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"64px"}
                type="text"
                placeholder="Some info about you"
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>City:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"32px"}
                type="text"
                placeholder="Some info about you"
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
        </Box>

        <HR></HR>
        <Box
          sx={{
            display: "flex",
          }}
        >
          <InfoContainer>
            <InfoTitle>Date of Birth:</InfoTitle>
            <InfoForChange>
              <InputInfo
                type="date"
                height={"32px"}
                value={date}
                onChange={(e) => onChangeDate(e)}
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>Private website:</InfoTitle>
            <InfoForChange>
              <InputInfo
                height={"32px"}
                type="text"
                placeholder="Some info about you"
              ></InputInfo>
            </InfoForChange>
          </InfoContainer>
        </Box>

        <SaveChangesBtn>Save</SaveChangesBtn>
      </EditMainInfo>
    </Container>
  );
};

export default EditProfile;
