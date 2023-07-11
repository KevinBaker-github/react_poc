import React, { Component } from 'react';
import {
    Table,
    Header,
    HeaderRow,
    HeaderCell,
    Body,
    Row,
    Cell,
} from '@table-library/react-table-library/table';

const list = [
    {
        id: '1',
        name: 'VSCode',
        deadline: new Date(2020, 1, 17),
        type: 'SETUP',
        isComplete: true,
    },
    {
        id: '2',
        name: 'JavaScript',
        deadline: new Date(2020, 2, 28),
        type: 'LEARN',
        isComplete: true,
    },
    {
        id: '3',
        name: 'React',
        deadline: new Date(2020, 3, 8),
        type: 'LEARN',
        isComplete: false,
    }
];

class FilterPage extends Component {
  state = {
    currentUserName: '',
    currentUserEmail: ''
  };

    constructor(props) {
        super(props)
        this.state = {
            property: []
        }
    }
  componentDidMount() {
    const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
    this.setState({
      currentUserEmail: idToken.idToken.claims.email,
      currentUserName: idToken.idToken.claims.name
    });
  }

  render() {
    const { currentUserEmail, currentUserName } = this.state;
      const data = { nodes: list };


    return (
     
            <Table data={data}>
            {(tableList) => (
                <React.Fragment><Header>

                        <HeaderRow>
                            <HeaderCell>Task</HeaderCell>
                            <HeaderCell>Deadline</HeaderCell>
                            <HeaderCell>Type</HeaderCell>
                            <HeaderCell>Complete</HeaderCell>
                        </HeaderRow>
                        </Header>
                    <Body>
                        {tableList.map((item) => (
                            <Row key={item.id} item={item}>
                                <Cell>{item.name}</Cell>
                                <Cell>
                                    {item.deadline.toLocaleDateString(
                                        'en-US',
                                        {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                        }
                                    )}
                                </Cell>
                                <Cell>{item.type}</Cell>
                                <Cell>{item.isComplete.toString()}</Cell>
                            </Row>
                        ))}
                    </Body>
                </React.Fragment>
                )}
            </Table>
    );
    }

}

export default FilterPage;
