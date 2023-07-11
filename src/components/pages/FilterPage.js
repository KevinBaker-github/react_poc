import * as React from 'react';
import axios from 'axios';
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
  useCustom,
} from '@table-library/react-table-library/table';
//Source https://www.robinwieruch.de/react-server-side-table/

const BASE_URL = 'http://hn.algolia.com/api/v1/search';

const INITIAL_PARAMS = {
  search: '',
};

const FilterPage = () => {
    const [data, setData] = React.useState({ nodes: [] });

  const fetchData = React.useCallback(async (params) => {
    const url = `${BASE_URL}?query=${params.search}`;
    const result = await axios.get(url);


    setData({ nodes: result.data.hits });
  }, []);

  React.useEffect(() => {
    fetchData({
      search: INITIAL_PARAMS.search,
    });
  }, [fetchData]);
    
  // server-side search
  const [search, setSearch] = React.useState(INITIAL_PARAMS.search);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

    useCustom('search', data, {
    state: { search },
    onChange: onSearchChange,
  });

    // listeners
      const timeout = React.useRef();

  function onSearchChange(action, state) {
   if (timeout.current) clearTimeout(timeout.current);

    timeout.current = setTimeout(
      () =>
        fetchData({
          search: state.search,
        }),
      500
    );
  }
  return (
      <React.Fragment>
       <label htmlFor="search">
        Search by Title:
        <input
          id="search"
          type="text"
          value={search}
          onChange={handleSearch}
        />
      </label>
    <Table data={data}>
      {(tableList) => (
         <React.Fragment>

          <Header>
            <HeaderRow>
              <HeaderCell>Title</HeaderCell>
              <HeaderCell>Created At</HeaderCell>
              <HeaderCell>Points</HeaderCell>
              <HeaderCell>Comments</HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map((item) => (
              <Row key={item.objectID} item={item}>
                <Cell>
                  <a href={item.url}>{item.title}</a>
                </Cell>
                <Cell>
                  {new Date(
                    item.created_at
                  ).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Cell>
                <Cell>{item.points}</Cell>
                <Cell>{item.num_comments}</Cell>
              </Row>
            ))}
          </Body>
         </React.Fragment>
      )}
    </Table>
    </React.Fragment>
  );

}

export default FilterPage;
