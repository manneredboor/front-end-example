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
  padding: 0.5em 0;
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  background-color: #e7e7e7;
  font-size: 12px;
  font-weight: bold;
  width: 40px;
  text-align: center;

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

const PAGES_SPREAD = 6
const SPREAD_HALF = Math.ceil((PAGES_SPREAD - 1) / 2)

interface PaginatorProps {
  current: number
  onChange: (i: number) => void
  total: number
}

export const Paginator = ({ current, onChange, total }: PaginatorProps) => {
  const showPrevMore = current > PAGES_SPREAD - SPREAD_HALF
  const showNextMore = current < total - SPREAD_HALF

  let pages = [...Array(total)].map((_, i) => i)

  const startAt =
    showPrevMore && !showNextMore
      ? total - (PAGES_SPREAD - 2)
      : showPrevMore && showNextMore
        ? current - SPREAD_HALF + 1
        : 2

  const endAt =
    !showPrevMore && showNextMore
      ? PAGES_SPREAD
      : showPrevMore && showNextMore
        ? current + SPREAD_HALF
        : total

  pages = pages.slice(startAt, endAt)

  return total > 1 ? (
    <Pages>
      {/* Prev */}
      <Page
        isDisabled={current === 1}
        onClick={() => onChange(Math.max(1, current - 1))}
      >
        {'⟨'}
      </Page>

      {/* First */}
      <Page isCurrent={current === 1} onClick={() => onChange(1)}>
        1
      </Page>

      {/* More Left */}
      {showPrevMore && (
        <Page onClick={() => onChange(current - SPREAD_HALF)}>{'⟨⟨'}</Page>
      )}

      {/* Pages */}
      {pages.map((page, i) => (
        <Page
          isCurrent={current === page}
          key={`${page}${i}`}
          onClick={() => onChange(page)}
        >
          {page}
        </Page>
      ))}

      {/* More Right */}
      {showNextMore && (
        <Page onClick={() => onChange(current + SPREAD_HALF)}>{'⟩⟩'}</Page>
      )}

      {/* Last */}
      <Page isCurrent={current === total} onClick={() => onChange(total)}>
        {total}
      </Page>

      {/* Next */}
      <Page
        isDisabled={current === total}
        onClick={() => onChange(Math.min(current + 1, total))}
      >
        {'⟩'}
      </Page>
    </Pages>
  ) : null
}
