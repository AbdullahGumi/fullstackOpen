import React from 'react';
import { connect } from 'react-redux';
import { filterAnecdotes } from '../reducers/filterReducer';

const Filter = ({ filterAnecdotes }) => {
  const handleChange = (event) => {
    filterAnecdotes(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = dispatch => ({
  filterAnecdotes: anecdote => dispatch(filterAnecdotes(anecdote))
})

export default connect(null, mapDispatchToProps)(Filter);