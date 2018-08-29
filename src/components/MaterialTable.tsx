import styled, { css } from 'styled-components'

interface TableProps {
  isBordered?: boolean
  isCondensed?: boolean
  isResponsive?: boolean
  isStriped?: boolean
}
export const Table = styled.table`
  box-shadow: 0 1px 3px 0 rgba(0,0,0,0.12), 0 1px 2px 0 rgba(0,0,0,0.24);
  width: 100%;
  max-width: 100%;
  margin-bottom: 2em;
  background-color: #fff;
  border: 0;
  border-collapse: collapse;

  & th,
  & td {
    text-align: left;
    padding: 1.6em;
    vertical-align: top;
    border: inherit;
  }

  & thead tr {
    border-bottom: 1px solid #e1e1e1;
  }

  & thead th {
    font-weight: 400;
    color: #3f3f3f;
    vertical-align: bottom;
  }

  ${(p: TableProps) => p.isBordered && css`
    & thead tr {
      border-bottom-width: 2px;
    }

    & tr {
      border-bottom: 1px solid #e1e1e1;
    }
  `}

  ${(p: TableProps) => p.isStriped && css`
    & tbody tr:nth-child(odd) {
      background-color: #f6f6f6;
    }
  `}

  ${(p: TableProps) => p.isCondensed && css`
    & tr,
    & th,
    & td {
      padding: 0.8em;
    }
  `}

  & caption + thead tr:first-child,
  & colgroup + thead tr:first-child,
  & thead:first-child tr:first-child {
    border-top: 0;
  }

  & caption + thead tbody + & caption + thead tbody,
  & colgroup + thead tbody + & colgroup + thead tbody,
  & thead:first-child tbody + & thead:first-child tbody {
    border-top: 1px solid #dedede;
  }

  & caption {
    opacity: 0.5;
    font-size: 0.8em;
    text-transform: uppercase;
    font-style: italic;
    text-align: left;
    line-height: 2;
    margin: 1em 0;
  }

  & tbody tr {
    transition: background-color 0.3s ease, opacity 0.3s ease;
  }

  & tbody tr:hover {
    background-color: #e7e7e7;
  }

  ${(p: TableProps) => p.isResponsive && css`
    @media screen and (max-width: 768px) {
      & {
        margin-bottom: 0;
        background-color: transparent;
      }
      & thead,
      & tfoot {
        display: none;
      }
      & tbody {
        display: block;
      }
      & tbody tr {
        display: block;
        border: 1px solid #e1e1e1;
        border-radius: 2px;
        margin-bottom: 1.6em;
      }
      & tbody tr td {
        background-color: #fff;
        display: block;
        vertical-align: middle;
        text-align: right;
      }
      & tbody tr td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: inherit;
        font-weight: 400;
        color: #3f3f3f;
      }
    }
  `}
`
