import React from 'react';
import PropTypes from 'prop-types';
import {
    Card,
    CardContent,
    CardMedia,
    FormControlLabel,
    IconButton,
    Typography
} from '@material-ui/core';
import Img from 'gatsby-image';
import './exec-card.scss';

const ExecCard = props => {
    const imageStyle = {
        margin: '16px auto 0',
        borderRadius: '50%',
        width: '166px',
        maxWidth: '100%',
        height: '166px',
        display: 'block',
        WebkitBorderRadius: '50%',
        WebkitBoxShadow: '0 0 0 8px rgba(0, 0, 0, 0.06)',
        boxShadow: '0 0 0 8px rgba(0, 0, 0, 0.06)'
    };

    const { image, name, position, email } = props;

    const imageComponent = image ? (
        <CardMedia
            component={Img}
            fixed={image.childImageSharp.fixed}
            title={name}
            style={imageStyle}
            src={image.childImageSharp.fixed.src}
        />
    ) : (
        <CardMedia
            component="img"
            height="166"
            image={`http://identicon.org/?t=${name}&s=166`}
            src={`http://identicon.org/?t=${name}&s=166`}
            title={name}
            style={imageStyle}
        />
    );

    const openEmail = email_ => (
        <div className="center-horizontal">
            <FormControlLabel
                control={
                    <a
                        target="_top"
                        rel="noopener noreferrer"
                        href={`mailto:${email_}`}
                    >
                        <IconButton color="primary" />
                    </a>
                }
                label={email_}
                labelPlacement="end"
            />
        </div>
    );

    return (
        <Card
            style={{
                margin: '16px 16px',
                width: '280px'
            }}
        >
            {imageComponent}
            <CardContent>
                <Typography
                    gutterBottom
                    variant="h5"
                    className="center-horizontal"
                >
                    {name}
                </Typography>
                <Typography component="p" className="center-horizontal">
                    {position}
                </Typography>
                {email && openEmail(email)}
            </CardContent>
        </Card>
    );
};

ExecCard.defaultProps = {
    image: null,
    email: null
};

ExecCard.propTypes = {
    email: PropTypes.string,
    image: PropTypes.object,
    name: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired
};

export default ExecCard;
