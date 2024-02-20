import { useState } from "react";
import styled from "@emotion/styled";

const Container = styled("div")`
  position: sticky;
  top: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  width: 40%;
  height: 500px;
  background-color: ${(props) => props.theme.palette.primary.grey[5]};
  border-radius: 8px;
  border: 1px solid ${(props) => props.theme.palette.primary.grey[3]};
  padding: 8px;
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

const InputSex = styled("input")`

`;

const FriendsFiltersSide = () => {
  const agesArr = [
    null,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    40,
    41,
    42,
    43,
    44,
    45,
    46,
    47,
    48,
    49,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    65,
    66,
    67,
    68,
    69,
    70,
    71,
    72,
    73,
    74,
    75,
    76,
    77,
    78,
    79,
    80,
  ];

  const [selectedFromAge, setSelectedFromAge] = useState(null);
  const [selectedToAge, setSelectedToAge] = useState(null);
  const [selectedSex, setSelectedSex] = useState("any");

  const handleRadioChange = (event) => {
    setSelectedSex(event.target.value);
  };

  return (
    <Container>
      <SortTitle>Age</SortTitle>
      <SortByAgeContainer>
        <SortByAgeSelect name="age_select">
          {agesArr.map((age) =>
            age ? (
              <SortByAgeOption value={age}>From {age}</SortByAgeOption>
            ) : (
              <SortByAgeOption value={age} selected>
                From
              </SortByAgeOption>
            )
          )}
        </SortByAgeSelect>

        <SortByAgeSelect>
          {agesArr.map((age) =>
            age > 0 ? (
              <SortByAgeOption value={age}>To {age}</SortByAgeOption>
            ) : (
              <SortByAgeOption value={age} selected>
                To
              </SortByAgeOption>
            )
          )}
        </SortByAgeSelect>
      </SortByAgeContainer>
      <HR></HR>
      <SortTitle>Sex</SortTitle>
      <InputSexContainer>
        <InputSex
          type="radio"
          name="sex"
          value="female"
          id="sex1"
          checked={selectedSex === "female"}
          onChange={(e) => handleRadioChange(e)}
        ></InputSex>
        <label htmlFor="sex1">Female</label>
      </InputSexContainer>
      <InputSexContainer>
        <InputSex
          type="radio"
          name="sex"
          value="male"
          id="sex2"
          checked={selectedSex === "male"}
          onChange={(e) => handleRadioChange(e)}
        ></InputSex>
        <label htmlFor="sex2">Male</label>
      </InputSexContainer>
      <InputSexContainer>
        <InputSex
          type="radio"
          name="sex"
          value="any"
          id="sex3"
          checked={selectedSex === "any"}
          onChange={(e) => handleRadioChange(e)}
        ></InputSex>
        <label htmlFor="sex3">Any</label>
      </InputSexContainer>
    </Container>
  );
};

export default FriendsFiltersSide;
