import styled from "@emotion/styled";
import CircularProgressWithLabel from "../customComponents/circularProgressWithLabel";

export const StandardCircleWithLabel = styled(CircularProgressWithLabel)(({ theme }) => ({
    height: '120px !important',
    width: '120px !important',
}));