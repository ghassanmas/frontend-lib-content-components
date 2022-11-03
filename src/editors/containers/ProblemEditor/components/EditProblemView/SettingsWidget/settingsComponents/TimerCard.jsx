import React from 'react';
import { injectIntl, FormattedMessage, intlShape } from '@edx/frontend-platform/i18n';
import SettingsOption from '../SettingsOption';
import { Form } from '@edx/paragon';
import PropTypes from 'prop-types';
import messages from '../messages';
import { timerCardHooks } from '../hooks';

export const TimerCard = ({
    timeBetween,
    updateSettings,
    //inject
    intl
}) => {
    const { handleChange } = timerCardHooks(updateSettings);

    return (
        <SettingsOption
            title={intl.formatMessage(messages.timerSettingsTitle)}
            summary={intl.formatMessage(messages.timerSummary, { time: timeBetween })}
        >
            <div className='spacedMessage'>
                <span>
                    <FormattedMessage {...messages.timerSettingText} />
                </span>
            </div>
            <Form.Group>
                <Form.Control
                    type="number"
                    value={timeBetween}
                    onChange={handleChange}
                    floatingLabel={intl.formatMessage(messages.timerInputLabel)}
                />
            </Form.Group>
        </SettingsOption>
    )
}

TimerCard.propTypes = {
    timeBetween: PropTypes.number.isRequired,
    intl: intlShape.isRequired,
};

export default injectIntl(TimerCard);
