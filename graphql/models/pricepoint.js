const pricePoint = (sequelize, DataTypes) => {
    const PricePoint = sequelize.define('pricepoint', {
        currency: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A price point needs to have a base currency.',
                },
            },
        },
        crypto: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A price point needs to have a crypto currency.',
                },
            },
        },
        value: {
            type: DataTypes.INT,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'A price point needs to have a value.',
                },
            },
        },
    });

    return PricePoint;
};
module.exports = pricePoint;