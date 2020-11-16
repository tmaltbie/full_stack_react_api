import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
    const {
        cancel,
        errors,
        submit,
        submitButtonText,
        elements,
    } = props;

    function handleSubmit(event) {
        event.preventDefault();
        submit();
    }

    function handleCancel(event) {
        event.preventDefault();
        cancel();
    }

    return (
        <div>
            <ErrorsDisplay errors={errors} />
            <form onSubmit={handleSubmit}>
                {elements()}
                <div className="pad-bottom">
                    <button className="button" type="submit">{submitButtonText}</button>
                    {/* <Link className="button-2" to="/">Cancel</Link> */}
                    <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

function ErrorsDisplay({ errors }) {
    let errorsDisplay = null;

    if (errors.length) {
        errorsDisplay = (
            <div>
                <h2 className="validation--errors--label">Validation errors</h2>
                <div className="validation-errors">
                    <ul>
                        {errors.map((error, i) => <li key={i}>{error}</li>)}
                    </ul>
                </div>
            </div>
        );
    }

    return errorsDisplay;
}