import styled from "styled-components";

const Container = styled.div`
display: flex;
width: 60%;
`

const EditMainInfo = styled.div`
width: 100%;
height: 500px;
background: #222;
border: 1px solid #363738;
border-radius: 12px;
`



const EditProfile = () => {
  return (
    <Container>
      <EditMainInfo></EditMainInfo>
    </Container>
  )
}

export default EditProfile;