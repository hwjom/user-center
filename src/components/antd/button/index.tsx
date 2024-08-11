import React from "react";
import {Button} from 'antd';
//
// interface BtnProps extends ButtonProps {
//     children?: React.ReactNode;
// }

const Index: React.FC = ({
                             children, ...reset
                         }) => {
    return <Button {...reset}>{children}</Button>
}
export default Index;

