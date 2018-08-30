import * as React from 'react'
import styled, { css } from 'styled-components'

const Pages = styled.div`
  display: flex;
  justify-content: center;
`

interface PageProps {
  isCurrent?: boolean
  isDisabled?: boolean
}
const Page = styled.div`
  margin: 0 10px;
  padding: 0.5em 1em;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  background-color: #e7e7e7;

  ${(p: PageProps) =>
    p.isCurrent &&
    css`
      background-color: #fff;
      border: 1px solid #e1e1e1;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12),
        0 1px 2px 0 rgba(0, 0, 0, 0.24);
    `};

  ${(p: PageProps) =>
    p.isDisabled &&
    css`
      background-color: transparent;
      cursor: default;
    `};
`

const PAGES_SPREAD = 7

interface PaginatorProps {
  current: number
  onChange: (i: number) => void
  total: number
}

export const Paginator = ({ current, onChange, total }: PaginatorProps) =>
  total > 1 ? (
    <Pages>
      {/* First */}
      <Page isDisabled={current === 0} onClick={() => onChange(0)}>
        {'<<'}
      </Page>

      {/* Prev */}
      <Page
        isDisabled={current === 0}
        onClick={() => onChange(Math.max(0, current - 1))}
      >
        {'<'}
      </Page>

      {/* Pages */}
      {[...Array(PAGES_SPREAD)].map((_, i) => {
        const page = i + current - Math.floor(PAGES_SPREAD / 2)
        return page >= 0 && page < total ? (
          <Page
            isCurrent={current === page}
            onClick={() => onChange(page)}
            key={i}
          >
            {page + 1}
          </Page>
        ) : null
      })}

      {/* Next */}
      <Page
        isDisabled={current === total - 1}
        onClick={() => onChange(Math.min(current + 1, total - 1))}
      >
        {'>'}
      </Page>

      {/* Last */}
      <Page
        isDisabled={current === total - 1}
        onClick={() => onChange(total - 1)}
      >
        {'>>'}
      </Page>
    </Pages>
  ) : null
