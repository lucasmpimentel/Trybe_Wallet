import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Wallet extends React.Component {
  state= {
    expenses: 0,
  }

  render() {
    const { email } = this.props;
    const { expenses } = this.state;

    return (
      <header className="header-wallet">
        <div className="container-email-expenses">
          <h5 data-testid="email-field">{ `Email: ${email}` }</h5>
          <p data-testid="total-field">{ `Despesa total: ${expenses}`}</p>
          <span data-testeid="header-currency-field">BRL</span>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Wallet);

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
};
