import React, { Component } from 'react';

export default class App extends Component {
	constructor(props) {
		super(props);

		this.income_title = React.createRef();
		this.income_value = React.createRef();
		this.expense_title = React.createRef();
		this.expense_value = React.createRef();

		const entry_list = JSON.parse(localStorage.getItem("entry_list") || []);
		//const entry_list = [];
		let calc_values = this.calculate(entry_list);

		this.state = {
			tab: 0,
			balance: calc_values.balance,
			income: calc_values.income,
			outcome: calc_values.outcome,
			entry_list: entry_list
		};
	};

	calculate = (list) => {
		let income = 0;
		let outcome = 0;
		let balance = 0;
		list.forEach((o, i) => {
			if (o.type === 'income') {
				income += o.amount;
			} else {
				outcome += o.amount;
			}
		})
		balance = income - outcome;
		return {
			income: income,
			outcome: outcome,
			balance: balance,
		}
	}

	add_income = (e) => {
		// e.preventDefault();
		const title = this.income_title.current.value;
		const value = this.income_value.current.value;

		if(!title || !value ) return;

		let entry_list = this.state.entry_list;
		entry_list.push({
			type : "income",
			title : title,
			amount : parseInt(value)
		});

		localStorage.setItem("entry_list", JSON.stringify(entry_list));

		let calc_values = this.calculate(entry_list);

		this.setState({
			entry_list: entry_list,
			balance: calc_values.balance,
			income: calc_values.income,
			outcome: calc_values.outcome,
		}, () => {
			this.income_title.current.value = '';
			this.income_value.current.value = '';
		})
	}

	add_expense = () => {
		const title = this.expense_title.current.value;
		const value = this.expense_value.current.value;

		if(!title || !value ) return;

		let entry_list = this.state.entry_list;
		entry_list.push({
			type : "expense",
			title : title,
			amount : parseInt(value)
		});

		localStorage.setItem("entry_list", JSON.stringify(entry_list));

		let calc_values = this.calculate(entry_list);

		this.setState({
			entry_list: entry_list,
			balance: calc_values.balance,
			income: calc_values.income,
			outcome: calc_values.outcome,
		}, () => {
			this.expense_title.current.value = '';
			this.expense_value.current.value = '';
		})
	}

	switch_tab = (tab_id) => {
		this.setState({
			tab: tab_id
		})
	}

	edit = (id) => {
		const entry = this.state.entry_list[id];
		if (entry.type === 'income') {
			this.income_title.current.value = entry.title;
			this.income_value.current.value = entry.amount;
		} else {
			this.expense_title.current.value = entry.title;
			this.expense_value.current.value = entry.amount;
		}
		this.delete(id);
	}

	delete = (id) => {
		let entry_list = this.state.entry_list;
		entry_list.splice(id, 1);
		let calc_values = this.calculate(entry_list);
		localStorage.setItem("entry_list", JSON.stringify(entry_list));
		this.setState({
			entry_list: entry_list,
			balance: calc_values.balance,
			income: calc_values.income,
			outcome: calc_values.outcome,
		})
	}

	get_list_item = (list_item, key) => {
		return (
			<li key={key} className={list_item.type}>
				<div className="entry">{list_item.title}: {list_item.amount}</div>
				<div id="edit" onClick={e => this.edit(key)}></div>
				<div id="delete" onClick={e => this.delete(key)}></div>
			</li>
		)
	}

	get_list = (filter) => {
		let list = [];
		this.state.entry_list.forEach((list_item, i) => {
			if (filter) {
				if (list_item.type !== filter) {
					return;
				}
			}
			list.push(this.get_list_item(list_item, i))
		});
		return list;
	}

	render() {
		return (
			<div className="wrapper">
				<div className="budget-container">
					<div className="imgBx">
						<img src="/budget2.jpg" alt="" />
					</div>
					<div className="only-budget">
						<div className="budget-header">
						<div className="app-title">
							<h1>Budget</h1>
						</div>
						<div className="balance">
							<div className="title">
								Balance
							</div>
							<div className="value">
								<small>$</small>{this.state.balance}
							</div>
						</div>
						<div className="account">
							<div className="income">
								<div className="title">
									Income
								</div>
								<div className="income-total">
									<small>$</small>{this.state.income}
								</div>
							</div>
							<div className="chart"></div>
							<div className="outcome">
								<div className="title">
									Outcome
								</div>
								<div className="outcome-total">
									<small>$</small>{this.state.outcome}
								</div>
							</div>
						</div>
					</div>
					<div className="budget-dashboard">
						<div className="toggle" data-tab_id={this.state.tab}>
							<div className="tab" onClick={e => this.switch_tab(0)} data-tab_id={0}>Income</div>
							<div className="tab" onClick={e => this.switch_tab(1)} data-tab_id={1}>Expense</div>
							<div className="tab" onClick={e => this.switch_tab(2)} data-tab_id={2}>All</div>
						</div>
						<div className="switch" data-tab_id={this.state.tab}>
							<div id="income" data-tab_id={0}>
								<ul className="list">{this.get_list('income')}</ul>
								<div className="input">
									<input type="text" id="income-title-input" name="title" placeholder="Title" ref={this.income_title}></input>
									<input type="number" id="income-amount-input" name="amount" placeholder="$0" ref={this.income_value}></input>
									<div className="add-income" onClick={e => this.add_income(e)}></div>
								</div>
							</div>
							<div id="expense" data-tab_id={1}>
								<ul className="list">{this.get_list('expense')}</ul>
								<div className="input">
									<input type="text" id="expense-title-input" name="title" placeholder="Title" ref={this.expense_title}></input>
									<input type="number" id="expense-amount-input" name="amount" placeholder="$0" ref={this.expense_value}></input>
									<div className="add-expense" onClick={e => this.add_expense()}></div>
								</div>
							</div>
							<div id="all" data-tab_id={2}>
								<ul className="list">{this.get_list()}</ul>
							</div>
						</div>
					</div>
					</div>
				</div>
			</div>
		);
	}
}
