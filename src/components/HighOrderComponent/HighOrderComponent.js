import React from "react";
import { ReactNode } from "react";

/**
 * @description:  高阶组件
 * @param {ReactNode} renderComponent 渲染组件
 * @param {array} props 属性
 * @return {*}
 * @author: mzc
 */
const HightOrderComponent = ({renderComponent, ...props}) => {
  return ({...props2}) => <renderComponent {...props} {...props2} />
}

export default HightOrderComponent;