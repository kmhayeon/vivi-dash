'use client'
import styled from 'styled-components';
import { Container, Box, Card, Typography, Button } from '@mui/material'


const CustomButton = styled(Button)`
  border-radius: 5px;
`;

export default function Home() {
  return (
    <main>
     <Container>
        <Box>
          <Card>
            <Typography>첫번째 진입 페이지</Typography>
            <CustomButton variant="outlined">커스텀 버튼</CustomButton>
          </Card>
        </Box>
      </Container>
    </main>
  )
}
