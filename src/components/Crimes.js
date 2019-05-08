import React, { Component } from 'react';
import '../App.css';
import { crimeCategories, forces, crimes } from '../config/api';

class Crimes extends Component {
    constructor() {
        super();
        this.state = {
            selectedCategory: '',
            selectedForce: '',
            crimeCategoriesList: [],
            forcesList: [],
            crimesList: [],
            listLimit: 50,
        }
        this.getCrimes = this.getCrimes.bind(this);
        this.onScroll = this.onScroll.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }

    componentDidMount() {
        this.getCrimesCategories();
        this.getForces();
        this.getCrimes();
    }

    async getCrimesCategories() {
        try {
            const result = await crimeCategories();
            // console.log('CrimeCategories result', result);
            this.setState({
                crimeCategoriesList: result,
            })
        } catch{

        }
    }

    async getForces() {
        try {
            const result = await forces();
            // console.log('Forces result', result);
            this.setState({
                forcesList: result,
            })
        } catch{

        }
    }

    async getCrimes() {
        const { selectedCategory, selectedForce } = this.state;
        try {
            const result = await crimes(selectedCategory, selectedForce);
            console.log('Crimes result', result);
            this.setState({
                crimesList: result,
            })
        } catch (e) {
            console.log('e in getCrimes: ', e)
        }
    }

    onScroll(e) {
        let scrollHeight = e.target.scrollHeight;
        let clientHeight = e.target.clientHeight;
        let scrollTop = e.target.scrollTop;
        console.log(scrollHeight, clientHeight, scrollTop)
        if (scrollHeight === Math.ceil(clientHeight + scrollTop)) {
            this.loadMore();
        }
    }

    loadMore() {
        console.log('loadmore ==>')
        this.setState({
            listLimit: this.state.listLimit + 20,
        })
    }

    render() {
        const { crimeCategoriesList, forcesList, crimesList, listLimit } = this.state;
        const resultArr = [...crimesList];
        resultArr.length = listLimit;
        console.log('crimesList', crimesList);
        console.log('resultArr', resultArr);
        return (
            <div className="Crimes">
                <select className="crimeCategories" onChange={(e) => { this.setState({ selectedCategory: e.target.value }) }}>
                    <option value="0">
                        Select Crime Category
                    </option>
                    {
                        crimeCategoriesList.map((item, index) => {
                            return <option key={index} value={item.url}>{item.name}</option>
                        })
                    }
                </select>

                <select className="forces" onChange={(e) => { this.setState({ selectedForce: e.target.value }) }}>
                    <option value="0">
                        Select Force
                    </option>
                    {
                        forcesList.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })
                    }
                </select>

                <button onClick={this.getCrimes}>
                    Search
                </button>

                <div className="crimes" onScroll={this.onScroll}>
                    <table>
                        <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Category</th>
                                <th>Date</th>
                            </tr>
                            {
                                resultArr.map((item) => {
                                    return <tr key={Math.random()}>
                                        <td key={Math.random()}>{item.id}</td>
                                        <td key={Math.random()}>{item.category}</td>
                                        <td key={Math.random()}>{item.month}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Crimes;