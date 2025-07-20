import { useState } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

const FIELD_ALPHABETIC = 'alphabetically';
const FIELD_LENGTH = 'length';
const FIELD_REVERSE = 'reverse';
const FIELD_RESET = 'reset';

function sortJSON(sortType, arr) {
  switch (sortType) {
    case FIELD_LENGTH:
      return [...arr].sort((a, b) => a.length - b.length);
    case FIELD_ALPHABETIC:
      return [...arr].sort((a, b) => a.localeCompare(b));
    default:
      return arr;
  }
}

export const App = () => {
  const [sortType, setFieldName] = useState('');
  const [products, setProducts] = useState([...goodsFromServer]);
  const [isReversed, setIsReversed] = useState(false);

  const visibleGoods = isReversed ? [...products].reverse() : products;

  function handleSort(field) {
    if (field === FIELD_REVERSE) {
      setIsReversed(prev => !prev);

      return;
    }

    if (field === FIELD_RESET) {
      setProducts([...goodsFromServer]);
      setFieldName('');
      setIsReversed(false);

      return;
    }

    const sorted = sortJSON(field, goodsFromServer);

    setFieldName(field);
    setProducts(sorted);
    setIsReversed(false);
  }

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={classNames('button', 'is-info', {
            'is-light': sortType !== FIELD_ALPHABETIC,
          })}
          onClick={() => handleSort(FIELD_ALPHABETIC)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={classNames('button', 'is-success', {
            'is-light': sortType !== FIELD_LENGTH,
          })}
          onClick={() => handleSort(FIELD_LENGTH)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={classNames('button', 'is-warning', {
            'is-light': !isReversed,
          })}
          onClick={() => handleSort(FIELD_REVERSE)}
        >
          Reverse
        </button>

        {visibleGoods.every((val, index) => val === goodsFromServer[index]) || (
          <button
            type="button"
            className={classNames('button', 'is-danger', {
              'is-light': sortType !== FIELD_RESET,
            })}
            onClick={() => handleSort(FIELD_RESET)}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
