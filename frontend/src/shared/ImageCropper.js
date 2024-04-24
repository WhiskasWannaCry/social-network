import { Avatar, Box, Button, Typography } from "@mui/material";
import { useContext, useRef, useState } from "react";
import Modal from "@mui/material/Modal";
import ReactCrop, {
  centerCrop,
  convertToPixelCrop,
  makeAspectCrop,
} from "react-image-crop";
import setCanvasPriview from "./setCanvasPreview";
import styled from "@emotion/styled";
import { Context } from "./Context";
import { postUploadImage } from "../http/Fetches";
import uploadImageIcon from "../images/icons/add-image.png";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import env from "react-dotenv";

const StyledInputFile = styled("input")``;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImageCropper = ({
  imageType,
  ASPECT_RATIO,
  MIN_DEMENSION,
  circularCrop,
  textForButton,
  setNewAvatar,
}) => {
  const [imgSrc, setImgSrc] = useState("");
  const [crop, setCrop] = useState("");
  const [imgError, setImgError] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const currentUserContext = useContext(Context);
  const { currentUser, setCurrentUser } = currentUserContext;

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
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
          setImgError(`The image must be least ${MIN_DEMENSION} pxs`);
          return setImgSrc("");
        }
      });
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

  const changeUserAvatar = async (newAvatar, userId) => {
    if (imageType === "avatar" || imageType === "background") {
      console.log(newAvatar)
      const { data } = await postUploadImage(newAvatar, userId, imageType);
      const { success } = data;
      if (!success) {
        const { message } = data;
        alert(message);
        return;
      }
      const { user } = data;
      setCurrentUser(user);
      const avatarFullPath = `${env.URL_SERVICES}:${env.PORT_SERVICE_ROOT}/${user?.images[imageType]}`;
      console.log(avatarFullPath);
      setNewAvatar(avatarFullPath);
    }
    if (imageType === "post") {
      setNewAvatar(newAvatar);
    }
  };

  const updateAvatar = (dataURL) => {
    // setNewAvatar(dataURL)
    changeUserAvatar(dataURL, currentUser._id);
  };

  return (
    <>
      {textForButton ? (
        <Button onClick={handleOpenModal}>{textForButton}</Button>
      ) : (
        <Avatar
          src={uploadImageIcon}
          alt="upload-image"
          onClick={handleOpenModal}
          sx={{
            cursor: "pointer",
            width: "20px",
            height: "20px",
            borderRadius: 0,
          }}
        ></Avatar>
      )}
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
            justifyContent: "center",
            alignItems: "center",
            gap: "16px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            minHeight: "50%",
            width: 700,
            backgroundColor: (theme) => theme.palette.primary.grey[6],
            border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
            borderRadius: "16px",
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
          {/* <StyledInputFile
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            sx={{
              width: "100%",
            }}
          ></StyledInputFile> */}
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            onChange={onSelectFile}
            sx={{
              backgroundColor: (theme) => theme.palette.primary.grey[3],
            }}
          >
            Upload image
            <VisuallyHiddenInput type="file" accept="image/*" />
          </Button>
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
                  circularCrop={circularCrop}
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
                      backgroundColor: (theme) => theme.palette.primary.grey[5],
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
                  handleCloseModal();
                  setImgSrc("");
                }}
              >
                Crop and save
              </Button>
            </Box>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ImageCropper;
