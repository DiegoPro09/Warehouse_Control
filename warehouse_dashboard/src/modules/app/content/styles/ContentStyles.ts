import { Header } from "antd/es/layout/layout";
import { Typography } from "antd";
import styled from "styled-components";
import { PalletteEnum } from "../../../../shared/pallete/PalleteEnum";

const { Title } = Typography

export const CustomHeader = styled(Header)`
    background: ${PalletteEnum.layout};
    display: flex;
    align-items: center;
`

export const ContentActions = styled(Title)`
    position: absolute !important;  
    right: 30px !important;
`