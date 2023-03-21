import React, { useEffect } from 'react';
import { injectIntl, FormattedMessage, intlShape } from '@edx/frontend-platform/i18n';
import { Alert, Form } from '@edx/paragon';
import PropTypes from 'prop-types';
import SettingsOption from '../../SettingsOption';
import messages from './messages';
import { ToleranceTypes } from './constants';

// eslint-disable-next-line no-unused-vars
export const isAnswerRangeSet = ({ answers }) =>
  // TODO: for TNL 10258
  // eslint-disable-next-line implicit-arrow-linebreak
  false;

export const handleToleranceTypeChange = ({ updateSettings, tolerance, answers }) => (event) => {
  if (!isAnswerRangeSet(answers)) {
    let value;
    if (event.target.value === ToleranceTypes.none.type) {
      value = null;
    } else {
      value = tolerance.value || 0;
    }
    const newTolerance = { type: event.target.value, value };
    updateSettings({ tolerance: newTolerance });
  }
};

export const handleToleranceValueChange = ({ updateSettings, tolerance, answers }) => (event) => {
  if (!isAnswerRangeSet(answers)) {
    const newTolerance = { value: event.target.value, type: tolerance.type };
    updateSettings({ tolerance: newTolerance });
  }
};

export const getSummary = ({ tolerance, intl }) => {
  switch (tolerance?.type) {
    case ToleranceTypes.percent.type:
      return `± ${tolerance.value}%`;
    case ToleranceTypes.number.type:
      return `± ${tolerance.value}`;
    case ToleranceTypes.none.type:
      return intl.formatMessage(messages.noneToleranceSummary);
    default:
      return intl.formatMessage(messages.noneToleranceSummary);
  }
};

export const ToleranceCard = ({
  tolerance,
  answers,
  updateSettings,
  // inject
  intl,
}) => {
  const canEdit = isAnswerRangeSet({ answers });
  let summary = getSummary({ tolerance, intl });
  useEffect(() => { summary = getSummary({ tolerance, intl }); }, [tolerance]);
  return (
    <SettingsOption
      title={intl.formatMessage(messages.toleranceSettingTitle)}
      summary={summary}
      none={tolerance.type === ToleranceTypes.none.type}
    >
      { canEdit
       && (
       <Alert
         varaint="info"
       >
         <FormattedMessage {...messages.toleranceAnswerRangeWarning} />
       </Alert>
       )}
      <div className="halfSpacedMessage">
        <span>
          <FormattedMessage {...messages.toleranceSettingText} />
        </span>
      </div>
      <Form.Group className="pb-0 mb-0">
        <Form.Control
          as="select"
          onChange={handleToleranceTypeChange({ updateSettings, tolerance, answers })}
          disabled={canEdit}
          value={tolerance.type}
        >
          {Object.keys(ToleranceTypes).map((toleranceType) => (
            <option
              key={toleranceType.type}
              value={toleranceType.type}
            >
              {intl.formatMessage(ToleranceTypes[toleranceType].message)}
            </option>
          ))}
        </Form.Control>
        { tolerance?.type !== ToleranceTypes.none.type && !canEdit
          && (
          <Form.Control
            className="mt-4"
            type="number"
            value={tolerance.value}
            onChange={handleToleranceValueChange({ updateSettings, tolerance, answers })}
            floatingLabel={intl.formatMessage(messages.toleranceValueInputLabel)}
          />
          )}
      </Form.Group>

    </SettingsOption>
  );
};

ToleranceCard.propTypes = {
  tolerance: PropTypes.shape({
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.any]),
  }).isRequired,
  answers: PropTypes.arrayOf(PropTypes.shape({
    correct: PropTypes.bool,
    id: PropTypes.string,
    selectedFeedback: PropTypes.string,
    title: PropTypes.string,
    unselectedFeedback: PropTypes.string,
  })).isRequired,
  updateSettings: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ToleranceCard);
