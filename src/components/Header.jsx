import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Header.css';

class Header extends Component {
  render() {
    const { email, currentBRLExpense } = this.props;
    const INITIAL_VALUE = 0;
    return (
      <header className="header-wallet">
        <div className="container-email-expenses">
          <h5 data-testid="email-field">{ `Email: ${email}` }</h5>
          <div>
            <span>Despesa total: </span>
            <span data-testid="total-field">
              {
                typeof currentBRLExpense === 'undefined'
                  ? INITIAL_VALUE : currentBRLExpense
              }
            </span>
            <span data-testid="header-currency-field">BRL</span>
          </div>
        </div>
      </header>
    );
  }
}
//
const mapStateToProps = (state) => ({
  email: state.user.email,
  currentBRLExpense: state.wallet.currentBRLExpense,
});

export default connect(mapStateToProps)(Header);

Header.propTypes = {
  email: PropTypes.string.isRequired,
  currentBRLExpense: PropTypes.number.isRequired,
};
