import { useContext, useState } from "react";
import styled from "@emotion/styled";
import {
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  RadioGroup,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { getUsersInfo } from "../../http/Fetches";
import { Context } from "../../shared/Context";

const Container = styled("div")`
  position: sticky;
  top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 40%;
  height: 450px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  padding: 16px;
  -webkit-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  -moz-box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
  box-shadow: ${({ theme }) => theme.palette.primary.blackShadow.small};
`;

const SortTitle = styled("div")`
  width: 100%;
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
`;

const HR = styled("div")`
  width: 100%;
  border: ${(props) => props.theme.palette.primary.grey[3]};
`;

const SortByAgeContainer = styled("div")`
  display: flex;
  gap: 16px;
  width: 100%;
`;

const SortByAgeSelect = styled("select")`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 8px 4px 8px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border-radius: 8px;
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
  outline: none;
`;

const SortByAgeOption = styled("option")`
  font-family: Roboto;
  font-size: 12.492px;
  font-style: normal;
  font-weight: 400;
`;

const InputSexContainer = styled("div")`
  display: flex;
  gap: 12px;
  width: 100%;
`;

const FriendsFiltersSide = ({ peopleSearchParams, setPeopleSearchParams }) => {
  const agesArr = [
    0, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
    51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
    70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
  ];

  const currentUserContext = useContext(Context);
  const { setUsersFromSearch } = currentUserContext;

  const handleRadioChange = (event) => {
    setPeopleSearchParams((prev) => ({
      ...prev,
      selectedSex: event.target.value,
    }));
  };

  const handleChangeFromAge = (event) => {
    setPeopleSearchParams((prev) => ({
      ...prev,
      selectedFromAge: Number(event.target.value),
    }));
  };

  const handleChangeToAge = (event) => {
    setPeopleSearchParams((prev) => ({
      ...prev,
      selectedToAge: Number(event.target.value),
    }));
    console.log(peopleSearchParams);
  };

  const handleFilter = async () => {
    const { data } = await getUsersInfo({
      peopleSearchParams: peopleSearchParams,
    });
    const { success } = data;
    if (!success) {
      const { message } = data;
      console.log(message);
      return alert(message);
    }
    const { users } = data;
    setUsersFromSearch(users);
  };

  return (
    <Container>
      <SortTitle>Age</SortTitle>
      <SortByAgeContainer>
        <FormControl
          sx={{ m: 1, display: "flex", flexGrow: 1, margin: 0 }}
          size="small"
        >
          <InputLabel
            id="demo-select-small-label"
            sx={{ color: (theme) => theme.palette.primary.grey[2] }}
          >
            From
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={peopleSearchParams.selectedFromAge}
            label="Age"
            onChange={handleChangeFromAge}
            sx={{
              color: (theme) => theme.palette.primary.grey[1],
              borderRadius: "8px",
              border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: (theme) => theme.palette.primary.grey[4],
                },
              },
            }}
          >
            {agesArr.map((age) =>
              age ? (
                <MenuItem key={age} value={age}>
                  From {age}
                </MenuItem>
              ) : (
                <MenuItem key={"NoFromAge"} value={age}>
                  From
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>

        <FormControl
          sx={{ m: 1, display: "flex", flexGrow: 1, margin: 0 }}
          size="small"
        >
          <InputLabel
            id="demo-select-small-label"
            sx={{ color: (theme) => theme.palette.primary.grey[2] }}
          >
            To
          </InputLabel>
          <Select
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={peopleSearchParams.selectedToAge}
            label="Age"
            onChange={handleChangeToAge}
            sx={{
              color: (theme) => theme.palette.primary.grey[1],
              borderRadius: "8px",
              border: (theme) => `1px solid ${theme.palette.primary.grey[3]}`,
            }}
            MenuProps={{
              PaperProps: {
                sx: {
                  backgroundColor: (theme) => theme.palette.primary.grey[4],
                },
              },
            }}
          >
            {agesArr.map((age) =>
              age ? (
                <MenuItem key={age} value={age}>
                  To {age}
                </MenuItem>
              ) : (
                <MenuItem key={"NoToAge"} value={age}>
                  To
                </MenuItem>
              )
            )}
          </Select>
        </FormControl>
      </SortByAgeContainer>
      <HR></HR>
      <SortTitle>Sex</SortTitle>
      <InputSexContainer>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            defaultValue="other"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              onChange={(e) => handleRadioChange(e)}
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
              onChange={(e) => handleRadioChange(e)}
            />
            <FormControlLabel
              value="other"
              control={<Radio />}
              label="Other"
              onChange={(e) => handleRadioChange(e)}
            />
          </RadioGroup>
        </FormControl>
      </InputSexContainer>
      <Button
        variant="outlined"
        onClick={handleFilter}
        sx={{
          width: "100%",
        }}
      >
        Filter
      </Button>
    </Container>
  );
};

export default FriendsFiltersSide;
