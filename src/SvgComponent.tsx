import React from "react"
import {JSDOM} from 'jsdom'
import { Text, Svg, Rect, G, ClipPath, Defs, Path, Tspan } from '@react-pdf/renderer';

type ComponentType = React.ElementType

// https://dev.to/qausim/convert-html-inline-styles-to-a-style-object-for-react-components-2cbi
const formatStringToCamelCase = (str: string) => {
  const splitted = str.split("-");
  if (splitted.length === 1) return splitted[0];
  return (
    splitted[0] +
    splitted
      .slice(1)
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join("")
  );
};

export const getStyleObjectFromString = (str: string | null) => {
  const style: any = {};
  if (!str) return {};
  
  str.split(";").forEach((el) => {
    const [property, value] = el.split(":");
    if (!property) return;
    const formattedProperty = formatStringToCamelCase(property.trim());
    style[formattedProperty] = value.trim();
  });

  return style;
};

function parseIntAttributes(attr: string | null) {
  if (!attr) return null;
  if (attr.includes('px')) return attr;

  return Number(attr);
}


export function SVGToComponent(html: string) {
  if (!html || html === "") return null;

  const jsDom = new JSDOM(html)

  function renderNode(node: Element) {
    let Component: ComponentType;
    let componentProps = {};
    switch(node.tagName.toUpperCase()) {
      case "SVG": 
        Component = Svg
        componentProps = {
          height: parseIntAttributes(node.getAttribute('height')),
          width: parseIntAttributes(node.getAttribute('width')),
          viewBox: node.getAttribute('viewBox'),
          style: {
            fontSize: '12px'
          }
        }
        break;
      case "RECT": 
        Component = Rect
        componentProps = {
          x: parseIntAttributes(node.getAttribute('x')),
          y: parseIntAttributes(node.getAttribute('y')),
          fill: node.getAttribute('fill'),
          width: parseIntAttributes(node.getAttribute('width')),
          height: parseIntAttributes(node.getAttribute('height')),
          rx: parseIntAttributes(node.getAttribute('rx')),
          ry: parseIntAttributes(node.getAttribute('ry'))
        }
        break
      case "CLIPPATH": 
        Component = ClipPath
        break;
      case "DEFS":
        Component = Defs
        break;
      case "G":
        Component = G
        componentProps = {
          'data-z-index': node.getAttribute('data-z-index'),
          opacity: node.getAttribute('opacity'),
          transform: node.getAttribute('transform'),
          'clip-path': node.getAttribute('clip-path'),
          visibility: node.getAttribute('visibility')
        }
        break;
      case "TEXT":
        Component = Text
        componentProps = {
          x: parseIntAttributes(node.getAttribute('x')),
          'text-anchor': node.getAttribute('text-anchor'),
          'data-z-index': node.getAttribute('data-z-index'),
          style: getStyleObjectFromString(node.getAttribute('style')),
          y: parseIntAttributes(node.getAttribute('y'))
        }
        break;
      case "PATH":
        Component = Path
        componentProps = {
          'data-z-index': node.getAttribute('data-z-index'),
          d: node.getAttribute('d'),
          fill: node.getAttribute('fill'),
          opacity: node.getAttribute('opacity')
        }
        break;
      case "TSPAN":
        componentProps = {
          x: parseIntAttributes(node.getAttribute("x")),
          y: parseIntAttributes(node.getAttribute("y")),
          fill: node.getAttribute("fill"),
          stroke: node.getAttribute("stroke"),
          "stroke-width": node.getAttribute("stroke-width"),
          "stroke-linejoin": node.getAttribute("stroke-linejoin"),
          opacity: parseIntAttributes(node.getAttribute('opacity')),
          visibility: node.getAttribute('visibility'),
          fontWeight: node.getAttribute('fontWeight')
        }
        Component = Tspan
        break;
      case "DESC":
        return null;
      default:
        throw new Error(`unsupported type ${node.tagName}`)
    }

    if(node.children) {
      return (
        <Component {...componentProps}>
          {Array.from(node.children).map(renderNode)}
        </Component>
      )
    } 
    return (
      <Component {...componentProps} />
    )
  }

  return renderNode(jsDom.window.document.body.children[0])
}