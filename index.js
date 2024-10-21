// strategy.forEach((singleStrategy, index) => {
//     const currPrice = curr_price[index];  // Get the corresponding price
//     const result = HowDoesThisStrategyWork(singleStrategy, currPrice); // Pass both values
//     const result_2 = WhatDoesThisStrategyInvlove(singleStrategy, currPrice); // Pass both values
//     const profit_result = getProfitRange(singleStrategy, currPrice)
//     console.log('work    ' + result);  // Log the result
//     console.log('');
//     console.log('invlove   ' + result_2);  // Log the result
//     console.log(profit_result)
//     console.log('');
// });

// const { type } = require("os");

// const curr_price = [210, 370, 300, 22, 450, 705, 39.66];
// const strategy = [{
//   type: 'BF',                    // Type of the strategy (Butterfly in this case)
//   symbol: 'AAPL',                 // Stock symbol (Apple in this example)
//   option_1_strike: 195,           // Strike price for option 1
//   option_2_strike: 220,           // Strike price for option 2
//   option_3_strike: 245,           // Strike price for option 3
//   P: -2.5,                        // Premium (P) value
//   duration: 60,                   // Duration of the strategy (in days)
//   expiration: '20241231',         // Expiration date (YYYYMMDD format)
//   execution_date: '20240901',     // Execution date (YYYYMMDD format)
//   M: 10                            // 'M' is a multiplier used in your calculations
// },
// {
//   type: 'BF',                    // Type of the strategy (Butterfly in this case)
//   symbol: 'NFLX',                 // Stock symbol (Apple in this example)
//   option_1_strike: 380,           // Strike price for option 1
//   option_2_strike: 425,           // Strike price for option 2
//   option_3_strike: 465,           // Strike price for option 3
//   P: -3.9,                        // Premium (P) value
//   duration: 60,                   // Duration of the strategy (in days)
//   expiration: '20241231',         // Expiration date (YYYYMMDD format)
//   execution_date: '20240901',     // Execution date (YYYYMMDD format)
//   M: 11.53                            // 'M' is a multiplier used in your calculations
// },
// {
//   type: 'BF',                    // Type of the strategy (Butterfly in this case)
//   symbol: 'NFLX',                 // Stock symbol (Apple in this example)
//   option_1_strike: 285,           // Strike price for option 1
//   option_2_strike: 245,           // Strike price for option 2
//   option_3_strike: 205,           // Strike price for option 3
//   P: -5.2,                        // Premium (P) value
//   duration: 60,                   // Duration of the strategy (in days)
//   expiration: '20241231',         // Expiration date (YYYYMMDD format)
//   execution_date: '20240901',     // Execution date (YYYYMMDD format)
//   M: 7.69                            // 'M' is a multiplier used in your calculations
// },
// {
// type: 'Strangle',                    // Type of the strategy (Butterfly in this case)
// symbol: 'AT&T',                 // Stock symbol (Apple in this example)
// option_1_strike: 23,           // Strike price for option 1
// option_2_strike: 21,           // Strike price for option 2
// P: -1.79,                        // Premium (P) value
// duration: 60,                   // Duration of the strategy (in days)
// expiration: '20241231',         // Expiration date (YYYYMMDD format)
// execution_date: '20240901',     // Execution date (YYYYMMDD format)
// M: 7.69,                            // 'M' is a multiplier used in your calculations
// S: 21.91
// },
// {
// type: 'RR',                    // Type of the strategy (Butterfly in this case)
// symbol: 'SPY',                 // Stock symbol (Apple in this example)
// option_1_strike: 490,           // Strike price for option 1
// option_2_strike: 520,           // Strike price for option 2
// P: -3.34,                        // Premium (P) value
// duration: 60,                   // Duration of the strategy (in days)
// expiration: '20241231',         // Expiration date (YYYYMMDD format)
// execution_date: '20240901',     // Execution date (YYYYMMDD format)
// M: 8.98,                            // 'M' is a multiplier used in your calculations
// S: 500,
// Leverage: 1
// },
// {
// type: 'IBP',                    // Type of the strategy (Butterfly in this case)
// symbol: 'NFLX',                 // Stock symbol (Apple in this example)
// option_1_strike: 720,           // Strike price for option 1
// option_2_strike: 720,           // Strike price for option 2
// option_3_strike: 740,           // Strike price for option 2
// option_4_strike: 695,           // Strike price for option 2
// option_5_strike: 780,           // Strike price for option 2
// option_6_strike: 650,           // Strike price for option 2
// Pnet: 35,                        // Premium (P) value
// duration: 60,                   // Duration of the strategy (in days)
// expiration: '20241231',         // Expiration date (YYYYMMDD format)
// execution_date: '20240901',     // Execution date (YYYYMMDD format)
// M: 8.98,                            // 'M' is a multiplier used in your calculations
// S: 500,
// Leverage: 1
// },
// {
// type: 'IBF',                    // Type of the strategy (Butterfly in this case)
// symbol: 'JD',                 // Stock symbol (Apple in this example)
// option_1_strike: 40,           // Strike price for option 1
// option_2_strike: 40,           // Strike price for option 2
// option_3_strike: 44,           // Strike price for option 2
// option_4_strike: 36,           // Strike price for option 2
// Pnet: 1.7,                        // Premium (P) value
// duration: 60,                   // Duration of the strategy (in days)
// expiration: '20241231',         // Expiration date (YYYYMMDD format)
// execution_date: '20240901',     // Execution date (YYYYMMDD format)
// M: 8.98,                            // 'M' is a multiplier used in your calculations
// S: 500,
// Leverage: 1.5
// },
// ];

function getDirection(strategy, currPrice) {
    return strategy.option_2_strike - currPrice < 0 ? "down" : "up";
}

function getSymetrica(strategy) {
  return (Math.abs(strategy.option_1_strike-strategy.option_2_strike) + strategy.P > Math.abs(strategy.option_2_strike-strategy.option_3_strike)) ? 0 : 1;
}

const getDurationInDays = (strategy) => {
  const expiration = new Date(strategy.expiration.slice(0, 4), strategy.expiration.slice(4, 6), strategy.expiration.slice(6, 8));
  const execution = new Date(strategy.execution_date.slice(0, 4), strategy.execution_date.slice(4, 6), strategy.execution_date.slice(6, 8));
  const diffTime = Math.abs(expiration - execution);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays
}

function getRRMachpil(strategy) {
    return (Math.abs(strategy.option_1_strike-strategy.option_2_strike) / -strategy.P) * 100;
}

function getMaxReturnText(strategy, amount){
  // amount = !amount ? 1 : amount
  amount = 1

  if(strategy.type === 'BF') {
      return Math.round((strategy.M-1)*100*amount) + "%";
  } else if(strategy.type === 'RR') {
      if(strategy.P > 0) {
          return "Infinite";
      } else {
          const machpil = getRRMachpil(strategy);
          return Math.round(machpil-100) * amount + '%';
      }
  } else if(strategy.type === 'IBP') {
      return Math.round(strategy.Pnet*100*amount) + "$";
  } else if(strategy.type === 'IBF') {
      return Math.round(strategy.Pnet*100*amount) + "$";
  } else if(strategy.type === 'Strangle') {
      return "Infinite";
  } else if(strategy.type === 'Straddle') {
      return "Infinite";
  }
}

function getRRBreakevenWperm(strategy, currPrice) {
    const direction = getDirection(strategy, currPrice);
    let breakeven;
    
    if(strategy.Leverage === 1) {
        breakeven = 0;
    } else {
        breakeven = strategy.option_2_strike-(strategy.option_1_strike-strategy.option_2_strike)/(strategy.Leverage-1);
        breakeven = (Math.round(breakeven * 10) / 10.0);
    }
    if (breakeven === 0) {
        if(direction === "up" && strategy.Leverage === 1) {
            return "Infinity";
        } else {
            return 0;
        }
    } else {
        const direction = getDirection(strategy, currPrice)
        return breakeven+strategy.P*(direction === 'up' ? 1 : -1);
    }
}

function getLossValues(strategy, currPrice) {
    if(strategy.type === 'IBF') {
        const lossUp = (strategy.Pnet-(strategy.option_3_strike-strategy.option_1_strike)<0) ? Math.round((strategy.Pnet+strategy.option_1_strike)*10)/10 : "NR"
        const lossUpPer = (lossUp === "NR") ? "NR" : ((lossUp/currPrice-1) * 100).toFixed(2)
        const lossDown = (strategy.Pnet-(strategy.option_2_strike-strategy.option_4_strike)<0) ? Math.round((-strategy.Pnet+strategy.option_2_strike)*10)/10 : "NR"
        const lossDownPer = (lossDown === "NR") ? "NR" : ((lossDown/currPrice-1) * 100).toFixed(2)
        return { lossUp, lossUpPer, lossDown, lossDownPer }
    }
}

function getProfitRange(strategy, currPrice) {
    if(strategy.type === 'BF') {
        const direction_multiplier = getDirection(strategy, currPrice) === 'up' ?  1 : -1
        const from = Math.round((strategy.option_1_strike-strategy.P*direction_multiplier) * 10) / 10.0;
        const to = Math.round((strategy.option_3_strike+strategy.P*direction_multiplier) * 10) / 10.0;
        const symetrica = getSymetrica(strategy);
        return from + (symetrica === 0 ? " and beyond" : " - " + to);
    } else if(strategy.type === 'RR') {
        const breakevenWperm = Math.round(getRRBreakevenWperm(strategy, currPrice) * 10) / 10.0;
        const direction = getDirection(strategy, currPrice);
        const premCalc = direction === 'up' ? strategy.P * -1 : strategy.P

        if(strategy.Leverage === 1) {
            return (strategy.option_1_strike + premCalc).toFixed(1) + " and " + (getDirection(strategy, currPrice) === "up" ? "above" : "below");
        } else {
            return (strategy.option_1_strike + premCalc).toFixed(1) + "-" + breakevenWperm;
        }
    } else if(strategy.type === 'IBP') {
        let lossUp;
        if(strategy.Pnet > strategy.option_3_strike-strategy.option_1_strike) {
            lossUp = strategy.option_5_strike+strategy.Pnet-(strategy.option_3_strike-strategy.option_1_strike);
        } else {
            lossUp = strategy.option_1_strike + strategy.Pnet;
        }

        const lossUpRound = Math.round(lossUp * 10) / 10.0;

        let lossDown;
        if(strategy.Pnet > strategy.option_2_strike-strategy.option_4_strike) {
            lossDown = strategy.option_6_strike-strategy.Pnet-(strategy.option_4_strike-strategy.option_2_strike);
        } else {
            lossDown = strategy.option_2_strike-strategy.Pnet;
        }

        const lossDownRound = Math.round(lossDown * 10) / 10.0;
        return lossDownRound + " - " + lossUpRound;
    } else if(strategy.type === 'IBF') {
        const { lossUp, lossDown } = getLossValues(strategy, currPrice)
        if(lossUp === "NR") {
            return lossDown + " and above"
        } else if(lossDown === "NR"){
            return lossUp + " and below"
        } else {
            return lossDown + ' - ' + lossUp
        }
    } else if(strategy.type === 'Strangle') {
        const profitUp = (strategy.option_1_strike - strategy.P).toFixed(1)
        const profitDown = (strategy.option_2_strike + strategy.P).toFixed(1)
        return "Above " + profitUp + " or below " + profitDown
    } else if(strategy.type === 'Straddle') {
        const profitUp = (strategy.option_1_strike - strategy.Pnet).toFixed(1)
        const profitDown = (strategy.option_2_strike + strategy.Pnet).toFixed(1)
        return "Above " + profitUp + " or below " + profitDown
    }
}

function HowDoesThisStrategyWork(strategy, current_price) {
    const profit_range = getProfitRange(strategy, current_price)
    const symbol = strategy.symbol;
    if(strategy.type === 'BF') {
        const direction = getDirection(strategy, current_price)
        const from = direction === 'up' ? Math.round((strategy.option_1_strike-strategy.P) * 10) / 10.0 : Math.round((strategy.option_1_strike+strategy.P) * 10) / 10.0;
        const to = (getSymetrica(strategy) === 1 ? (direction === 'up'? Math.round((strategy.option_3_strike+strategy.P) * 10) / 
        10.0 : Math.round((strategy.option_3_strike-strategy.P) * 10) / 10.0) : direction === 'up' ? "and beyond" : "and below");
        const premium = -Math.round(strategy.P*100) + "$";
        const lower_or_higher = direction === 'up' ? 'lower' : 'higher'
        const additional_language_if_symetric = getSymetrica(strategy) === 1 ? "or travels beyond " + to : ''
        return `This strategy is designed to take advantage of a price movement in ${symbol}. If the stock price moves within the anticipated range of ${profit_range} in \
        ${getDurationInDays(strategy)} days, you could see a significant profit, up to ${getMaxReturnText(strategy)}.However, if the price remains ${lower_or_higher} than\ 
        ${from} ${additional_language_if_symetric}, your loss is capped at ${premium} for 1 unit (1 option per each leg). It is like a structured bet with a defined risk and\ 
        potentially high reward.`.replace(/\n\s+/g, ' ').trim();
  }
  else if(strategy.type === 'RR') {
    const premium = -Math.round(strategy.P*100) + "$";
    const rises_or_drops = getDirection(strategy, current_price) === 'up' ? 'rises' : 'drops'
    const drops_or_rises = getDirection(strategy, current_price) === 'up' ? 'decreases' : 'increases'
    const call_or_put = getDirection(strategy, current_price) === 'up' ? 'Call' : 'Put'
    const higher_or_lower = getDirection(strategy, current_price) === 'up' ? 'higher' : 'lower'
    const above_or_below = getDirection(strategy, current_price) === 'up' ? 'above' : 'below'
    const bull_or_bear = getDirection(strategy, current_price) === 'up' ? 'bullish' : 'bearish'
    const gap = Math.abs(strategy.option_1_strike - strategy.option_2_strike)
    if(strategy.Leverage === 1) {
        return `This strategy is known as buying a ${call_or_put} Spread (sometimes referred to as a ${bull_or_bear} spread). 
        By applying this strategy you assume that the price ${rises_or_drops} in the next ${getDurationInDays(strategy)} days. Your initial investment is the net premium paid, 
        which is ${premium} for each unit, and this amount also represents the maximum that you are willing to risk in case ${symbol}'s share remains at current levels 
        or ${drops_or_rises}. 
        You'll start to to profit if ${symbol}’s price ${rises_or_drops} within the range of ${profit_range}. 
        The long ${call_or_put} (the one you bought) provides gains as the stock price ${rises_or_drops}. However, since you’ve sold a ${call_or_put} at a higher strike price, 
        your profit is capped ${above_or_below} ${strategy.option_2_strike} with a maximum gain of $${gap} per each unit.`.replace(/\n\s+/g, ' ').trim();
    }
    else  {
        const long_leg_quant = strategy.Leverage === 1.5 ? 2 :strategy.Leverage === 2 ? 1 : 4
        const short_leg_quant = strategy.Leverage === 1.5 ? 3 :strategy.Leverage === 2 ? 2 : strategy.Leverage === 1.25 ? 4 : 7
        const single_or_plural = long_leg_quant > 1 ? 's' : ''
        return `In a Ratio Call Spread ,you basically assume that the current price ${rises_or_drops} moderatly and expect to gain a high return if your view is correct. 
        Your initial investment is the net premium paid, which is ${premium} and you will make a profit if ${symbol}’s price ${rises_or_drops} within the 
        range of ${profit_range}. 
        The ${long_leg_quant} long ${call_or_put}${single_or_plural} that you bought provides gains as the stock price ${rises_or_drops}. 
        However, since you’ve sold ${short_leg_quant} ${call_or_put}s at a ${higher_or_lower} strike price, your profit caps beyond $${strategy.option_2_strike}. 
        If the stock price ${rises_or_drops} too far beyond ${strategy.option_2_strike}, your losses will grow significantly, as you’ll be obligated to cover 
        the ${short_leg_quant} short ${call_or_put}s. While the loss potential is theoretically unlimited, the structure of this trade enables you to reduce the premium and 
        only pay ${premium} for the spread.`.replace(/\n\s+/g, ' ').trim();
    }
}
  else if(strategy.type === 'Straddle') {
    const premium = -Math.round(strategy.Pnet*100) + "$";
    return `The straddle strategy works by taking advantage of significant price movement, regardless of the direction. You profit if ${symbol}'s price moves ${profit_range}, 
    as shown by the green area on the chart. If the stock price remains in this level, you will incur a loss, with a maximum potential loss of ${premium}. 
    This strategy benefits from high volatility, and the more the stock moves in either direction, the greater your potential profit.`.replace(/\n\s+/g, ' ').trim();
}
    else if(strategy.type === 'Strangle') {
        const premium = -Math.round(strategy.P*100) + "$";
        return `The strangle strategy works by taking advantage of significant price movement, regardless of the direction. You profit if ${symbol}'s price moves ${profit_range}, 
        as shown by the green area on the chart. If the stock price remains between those levels, you will incur a loss, with a maximum potential loss of ${premium}. 
        This strategy benefits from high volatility, and the more the stock moves in either direction, the greater your potential profit.`.replace(/\n\s+/g, ' ').trim();
    }
    else if(strategy.type === 'IBF') {
        const up_risk = strategy.option_3_strike - strategy.option_1_strike;
        const down_risk = strategy.option_2_strike - strategy.option_4_strike;
        const max_risk = up_risk > down_risk ? up_risk : down_risk 
        const where_is_max_risk = up_risk === down_risk ? `above ${strategy.option_3_strike} or below ${strategy.option_4_strike}` : up_risk > down_risk ? `above ${strategy.option_3_strike}` : `below ${strategy.option_4_strike}`;
        const max_loss = -Math.round((-max_risk + strategy.Pnet)*100);
        return `The Iron Butterfly strategy works by centering the profit potential around the strike price of ${strategy.option_1_strike}. If ${symbol}’s price remains 
        close to this price by expiration, you can achieve the maximum profit, as shown by the green area on the chart. However, if the price moves significantly 
        ${where_is_max_risk}, your losses will increase, as represented by the red area, with a maximum possible loss of $${max_loss}. This strategy is ideal for market 
        conditions where the stock price is expected to remain relatively stable over the next ${getDurationInDays(strategy)} days.`.replace(/\n\s+/g, ' ').trim();
    }
    else if(strategy.type === 'IBP') {
        const bottom_range = profit_range.split('-')[0]
        const upper_range = profit_range.split('-')[1]
        return `The Iron Butterfly strategy works by selling a call and a put at the same strike price (close to ${symbol}'s current price) and 
        simultaneously buying a call and a put spreads at farther strike prices, creating a "wingspan." Your goal is for the stock price to stay close to 
        the middle strike price — around $${strategy.option_1_strike} — where the potential profit is highest, as shown by the green area on the chart. 
        If ${symbol}'s price moves too far in either direction (below $${bottom_range}or above $${upper_range}), your potential loss increases, 
        as represented by the red areas. This strategy benefits from minimal stock movement, offering a broad range of profit but 
        with increased risk if the stock makes large moves beyond the set range.`.replace(/\n\s+/g, ' ').trim();
    }
}

function WhatDoesThisStrategyInvlove(strategy, current_price) {
    const symbol = strategy.symbol;
    const profit_range = getProfitRange(strategy, current_price)
    if(strategy.type === 'BF') {
        return `This strategy involves a multi-leg options trade, which includes buying and selling different option contracts with various strike prices. The goal is to capitalize
        on a specific price movement while managing risk. The three legs refer to the specific combination of options being traded to form this particular strategy.`.replace(/\n\s+/g, ' ').trim();
    }
    else if(strategy.type === 'RR') {
        const premium = -Math.round(strategy.P*100) + "$";
        const call_or_put = getDirection(strategy, current_price) === 'up' ? 'Call' : 'Put'
        const upward_or_downward = getDirection(strategy, current_price) === 'up' ? 'upward' : 'downward'
        const bull_or_bear = getDirection(strategy, current_price) === 'up' ? 'bullish' : 'bearish'
        if(strategy.Leverage === 1) {
            return `This strategy is a vertical ${call_or_put} Spread (also known as a ${bull_or_bear} spread), where you buy one out-of-the-money (OTM) ${call_or_put} 
            and sell one farther OTM ${call_or_put}. 
            The net premium paid is negative, meaning you’ve spent an initial amount to enter the strategy (in this case, ${premium} for each unit). 
            The objective is to profit from moderate ${upward_or_downward} movement in ${symbol}’s stock, while capping both the potential profit and loss.`.replace(/\n\s+/g, ' ').trim();
        }
        else  {
            const long_leg_quant = strategy.Leverage === 1.5 ? 2 :strategy.Leverage === 2 ? 1 : 4
            const short_leg_quant = strategy.Leverage === 1.5 ? 3 :strategy.Leverage === 2 ? 2 : strategy.Leverage === 1.25 ? 4 : 7
            const credit_or_debit = strategy.P > 0 ? 'receiving a net credit' : 'paying a net debit'
            const minus_or_plus = strategy.P > 0 ? '' : '-'
            return `This strategy is a Ratio ${call_or_put} Spread with Leverage, where you buy ${long_leg_quant} out-of-the-money (OTM) call and sell ${short_leg_quant} farther OTM calls. 
            The strategy aims to profit from moderate price movements, with leverage increasing both the potential gain and the potential risk. 
            The premium could be either positive (credit) or negative (debit) depending on the prices of the options involved. 
            In this specific case, the premium is ${minus_or_plus}${premium}, which means you're ${credit_or_debit} at the start.`.replace(/\n\s+/g, ' ').trim();
        }
    }
    else if(strategy.type === 'Straddle') {
        const premium = -Math.round(strategy.Pnet*100) + "$";
        return `This strategy is a strangle, which involves buying both a call option and a put option at the same strike price, close to the current price, 
        giving you the potential to profit from any price movement in either direction. The strategy has 2 legs, aiming to benefit from high volatility in ${symbol}'s 
        stock price over the next ${getDurationInDays(strategy)} days. The profit range is broad, ${profit_range}. 
        The maximum risk is limited to the premium you’ve paid, which is ${premium} per strategy.`.replace(/\n\s+/g, ' ').trim();
    }
    else if(strategy.type === 'Strangle') {
        const premium = -Math.round(strategy.P*100) + "$";
        return `This strategy is a straddle, which involves buying both a call option and a put option at the same strike price, giving you the potential to profit from 
        significant price movement in either direction. The strategy has 2 legs, aiming to benefit from high volatility in ${symbol}'s stock price over the next 
        ${getDurationInDays(strategy)} days. The profit range is broad, ${profit_range}. The maximum risk is limited to the premium you’ve paid, which is ${premium} per strategy.`.replace(/\n\s+/g, ' ').trim();
    }
    else if(strategy.type === 'IBF') {
        bottom_range = profit_range.split('-')[0];
        upper_range = profit_range.split('-')[1];
        const premium = Math.round(strategy.Pnet*100) + "$";
        const up_risk = strategy.option_3_strike - strategy.option_1_strike;
        const down_risk = strategy.option_2_strike - strategy.option_4_strike;
        const max_risk = up_risk > down_risk ? up_risk : down_risk 
        const max_loss = -Math.round((-max_risk + strategy.Pnet)*100);
        return `This strategy is an Iron Butterfly, which involves selling both a call and a put at the same strike price (close to the current price of $${current_price}), 
        while also buying a call and a put at higher and lower strike prices. The strategy has 4 legs and is designed to benefit from minimal price movement in ${symbol}. 
        The maximum potential profit is ${premium}, and the maximum risk is limited to ${max_loss} if the stock price moves significantly beyond the expected range.`.replace(/\n\s+/g, ' ').trim();
    }
    else if(strategy.type === 'IBP') {
        const premium = Math.round(strategy.Pnet*100) + "$";
        return `This strategy is an Iron Butterfly, which combines buying and selling call and put options to establish a defined range of potential 
        profit and loss. You benefit when ${symbol}'s price remains between ${profit_range} by expiration, earning a maximum potential return 
        of ${premium}. The setup includes 6 legs: buying and selling options at different strike prices to structure this strategy. Your maximum 
        risk is unlimited if ${symbol}'s price moves significantly outside this range.`.replace(/\n\s+/g, ' ').trim();
    }
}

function WhatIsMyMaximumRisk(strategy, current_price) {
    const symbol = strategy.symbol;
    const direction = getDirection(strategy, current_price)
    const profit_range = getProfitRange(strategy, current_price)
    if(strategy.type === 'BF') {
        const premium = -Math.round(strategy.P*100) + "$";
        return `Your maximum risk in this strategy is the cost of entering the trade, which is ${premium}. This is the most you can lose, no matter how far the price of ${symbol}\
         moves in the opposite direction.`.replace(/\n\s+/g, ' ').trim();
    }
    else if(strategy.type === 'Straddle') {
        const premium = -Math.round(strategy.Pnet*100) + "$";
        return `Your maximum risk in this strategy is the cost of entering the trade, which is ${premium}
        for 1 unit (1 option for each leg). This is the most you can lose, and it would only occur 
        if the price remains exactly ${strategy.option_1_strike} at expiration`.replace(/\n\s+/g, ' ').trim();
    }
    else if(strategy.type === 'Strangle') {
        const premium = -Math.round(strategy.P*100) + "$";
        return `Your maximum risk in this strategy is the cost of entering the trade, which is ${premium}
        for 1 unit (1 option for each leg). This is the most you can lose, and it would only occur 
        if the price remains between ${strategy.option_2_strike} - ${strategy.option_1_strike} at expiration`.replace(/\n\s+/g, ' ').trim();
    }
    else if (strategy.type === 'RR') {
        const premium = -Math.round(strategy.P*100) + "$";
        max_loss_bar = (direction === 'down' ? 'above ' : 'below ') + strategy.option_1_strike
        if (strategy.Leverage === 1) {
            return `Your maximum risk is limited to the premium you have paid which is ${premium} for 1 unit (1 option for each leg). 
            This entire loss will be incurred if the price at expiration is ${max_loss_bar}`.replace(/\n\s+/g, ' ').trim();
        }
        else {
            break_even = direction === 'up' ? Math.max(profit_range.split('-')[0], profit_range.split('-')[1]) : Math.min(profit_range.split('-')[0], profit_range.split('-')[1])
            break_even_text = direction === 'up' ? 'above ' + break_even : 'below ' + break_even
            pace_of_loss = (strategy.Leverage - 1) * 100
            return `For this ${symbol} strategy, your maximum risk is unlimited if the stock price moves significantly ${break_even_text}, 
            as indicated by the red area on the chart. After this point, you will lose at a rate of $${pace_of_loss} for each 1$ the stock 
            goes ${direction} (this refers to a quantity of 1 option for each leg)`.replace(/\n\s+/g, ' ').trim();
        }
    }
    else if (strategy.type === 'IBP') {
        return `For this ${symbol} strategy, your maximum risk is technically unlimited if the price moves significantly outside the profit range of 
        ${profit_range}. However, this only happens if the stock experiences a large movement either way. As long as Netflix's price stays within or 
        near this range, your risk remains more controlled, with potential for profit within the green zone. It’s a strategy designed to offer a 
        broad range of profit, so keeping an eye on the price movements over the next ${getDurationInDays(strategy)} days will help you manage any 
        potential losses.`.replace(/\n\s+/g, ' ').trim();
    }
    else if (strategy.type === 'IBF') {
        const up_risk = strategy.option_3_strike - strategy.option_1_strike;
        const down_risk = strategy.option_2_strike - strategy.option_4_strike;
        const max_risk = up_risk > down_risk ? up_risk : down_risk 
        const where_is_max_risk = up_risk === down_risk ? `above ${strategy.option_3_strike} or below ${strategy.option_4_strike}` : up_risk > down_risk ? `above ${strategy.option_3_strike}` : `below ${strategy.option_4_strike}`;
        const max_loss = -Math.round((-max_risk + strategy.Pnet)*100);
        return `For this ${symbol} strategy, your maximum risk is $${max_loss}. This is the most you can lose if the stock price moves out of the 
        profitable range, specifically if it goes ${where_is_max_risk} within the next ${getDurationInDays(strategy)} days. Your 
        potential loss is represented by the red area on the chart.`.replace(/\n\s+/g, ' ').trim();
    }
} 

function WhatIsMyPotentialProfit(strategy, current_price) {
    const symbol = strategy.symbol;
    const max_return = getMaxReturnText(strategy);
    const direction = getDirection(strategy, current_price)
    const profit_range = getProfitRange(strategy, current_price)
    
    if (strategy.type === 'BF') {
        const rises_or_falls = direction === 'up'? 'rises' : 'falls';
        const above_or_below = direction === 'up'? 'above' : 'below';
        const chance_of_loss = getSymetrica(strategy) === 1 ? 
            'eventually, if it moves too far, you could even end up at a loss.' : '';
        return `You profit anywhere within the range of ${profit_range}. The profit potential peaks at $${strategy.option_2_strike} per share, \
        where you can achieve a maximum return of ${max_return}, like reaching the summit of a mountain. As the price of ${symbol} ${rises_or_falls} to this point, your profits\
         increase. However, any further movement ${above_or_below} this peak will start to reduce your profit, much like descending the other side of the mountain.\ ${chance_of_loss}`.replace(/\n\s+/g, ' ').trim();
    } 

    else if (strategy.type === 'Straddle' || strategy.type === 'Strangle') {
        const premium = strategy.type === 'Straddle' ? -Math.round(strategy.Pnet * 100) + "$" : -Math.round(strategy.P * 100) + "$"
        return `Your profit potential for this ${symbol} ${strategy.type} strategy is highest when the price moves significantly 
        ${profit_range}, as indicated by the green profit areas on the chart. The further the price moves beyond these thresholds, the more 
        profit you make. However, if ${symbol}'s price stays near the current level of $${current_price}, or moves only slightly, your losses can 
        increase, up to a maximum loss of ${premium}, as shown by the red loss zone. This strategy benefits from high volatility—large price 
        swings either upward or downward — but if the stock remains stable, your potential loss increases. The upside is theoretically unlimited, 
        but the downside is capped at your initial investment.`.replace(/\n\s+/g, ' ').trim();
    } 

    else if (strategy.type === 'RR') {
        const from = profit_range.split('-')[0];
        const rises_or_drops = direction === 'up'? 'rises above' : 'drops below';
        const opposite_direction = direction === 'up'? 'drops below' : 'rises above';
        const increases_or_declines = direction === 'up'? 'increases' : 'declines';
        
        if (strategy.Leverage === 1) {
            return `For this ${symbol} strategy, you are aiming for a high return when the price ${rises_or_drops} $${from}, represented by 
            the green profit area. The greater it ${rises_or_drops} this level, the larger the potential gain, with a maximum return of 
            ${max_return}. However, if ${symbol} remains around the current price of $${current_price} or ${opposite_direction} after 
            ${getDurationInDays(strategy)} days, your maximum loss is ${premium}, indicated by the red area. This strategy is highly profitable if 
            ${symbol}'s price ${increases_or_declines} significantly, but if it doesn't, you risk the full loss of your investment.`.replace(/\n\s+/g, ' ').trim();
        } else {
            const to = profit_range.split('-')[1];
            const upside_or_downside = direction === 'up'? 'upside' : 'downside';
            const significantly_or_not = strategy.Leverage > 1.5 ? 'significantly' : ''
            return `For this ${symbol} strategy, your profit potential peaks when the stock price stays within the range of ${profit_range}, 
            as indicated by the green area. If the price ${opposite_direction} ${from}, instead of a gain, you will incur a slight fixed loss. 
            On the other hand, if the price ${rises_or_drops} $${to}, your losses can increase ${significantly_or_not}. This strategy allows for potential 
            high returns if the stock stays within the target range, but if it moves outside of this, especially to the ${upside_or_downside}, 
            your risk increases. Keep an eye on the stock movement, as there is only a ${getDurationInDays(strategy)}-day duration.`.replace(/\n\s+/g, ' ').trim();
        }
    }
    
    else if (strategy.type === 'IBP') {
            const premium = Math.round(strategy.Pnet * 100);
            return `For this ${symbol} strategy, your profit potential is highest when the stock price is within the range of ${profit_range}, 
            represented by the green area on the chart. If the stock price stays within this range, you can achieve a maximum return of $${premium}. 
            The strategy benefits from a broad range of profitable outcomes. However, if ${symbol}’s price moves significantly above or below this 
            range, you face the risk of unlimited losses, as shown by the red areas on either side of the chart. The current stock price of ${current_price} 
            places you near the center of the profitable zone, but a large move outside the range could lead to substantial losses.'
            This strategy is designed for a balanced market movement and offers a high profit potential if the stock stays within the desired range 
            over the next ${getDurationInDays(strategy)} days.`.replace(/\n\s+/g, ' ').trim();
        }
    
    else if (strategy.type === 'IBF') {
        const premium = Math.round(strategy.Pnet * 100);
        const max_loss = -Math.round((-Math.max(strategy.option_3_strike-strategy.option_1_strike, strategy.option_2_strike-strategy.option_4_strike) + strategy.Pnet)*100);
        return `For this ${symbol} strategy, your profit peaks when the stock price reaches ${strategy.option_1_strike}, as indicated by the green area on the chart. 
        At this peak, you can achieve a maximum return of $${premium} per each unit (for example, executing a quantity of 10 will allow a 
        max return of $${premium*10}). This strategy will be profitable as long as the stock price stays in the range of ${profit_range}. 
        However, if ${symbol}'s price moves outside this range, you could face a loss of up to $${max_loss}, represented by the red area. 
        This strategy is designed to deliver profit with minimal risk in stable market conditions, particularly when the stock price remains 
        around the current price within the next ${getDurationInDays(strategy)} days.`.replace(/\n\s+/g, ' ').trim();
    }
}


function determine_strategy(types, strike){
    if(types.length === 6) {
        return 'IBP'}
    else if(types.length === 4) {
        return 'IBF'}
    else if(types.length === 3) {
        return 'BF'}
    else {
        if(types[0] === types[1]) {
            return 'RR'
        }
        else if(strike[0] === strike[1]) {
            return 'Straddle'
        }
        else {
            return 'Strangle'
        }
    }
}

function create_strategy(symbol, strategy_type, strikes, expirationDate, premium){
    const expiry = get_expiration(expirationDate)
    const unit_premium = get_premium(premium)
    const execution_day = get_execution_date()
    if (strategy_type === 'BF') {
        return {type: strategy_type,                    // Type of the strategy (Butterfly in this case)
        symbol: symbol,                 // Stock symbol (Apple in this example)
        option_1_strike: strikes[0],           // Strike price for option 1
        option_2_strike: strikes[1],           // Strike price for option 2
        option_3_strike: strikes[2],           // Strike price for option 3
        P: unit_premium,                        // Premium (P) value
        expiration: expiry,         // Expiration date (YYYYMMDD format)
        execution_date: execution_day,     // Execution date (YYYYMMDD format)
        M: Math.abs((strikes[1] - strikes[0]) / unit_premium)                            // 'M' is a multiplier used in your calculations
        }
    }
    else if (strategy_type === 'RR'){
        return {type: strategy_type,                    // Type of the strategy (Butterfly in this case)
            symbol: symbol,                 // Stock symbol (Apple in this example)
            option_1_strike: strikes[0],           // Strike price for option 1
            option_2_strike: strikes[1],           // Strike price for option 2
            P: unit_premium,                        // Premium (P) value
            expiration: expiry,         // Expiration date (YYYYMMDD format)
            execution_date: execution_day,     // Execution date (YYYYMMDD format)
            Leverage: 1
        }
    }
    else if ((strategy_type === 'Strangle') || (strategy_type === 'Straddle')) {
        return {type: strategy_type,                    // Type of the strategy (Butterfly in this case)
            symbol: symbol,                 // Stock symbol (Apple in this example)
            option_1_strike: strikes[0],           // Strike price for option 1
            option_2_strike: strikes[1],           // Strike price for option 2
            P: unit_premium,                        // Premium (P) value
            expiration: expiry,         // Expiration date (YYYYMMDD format)
            execution_date: execution_day,     // Execution date (YYYYMMDD format)
        }
    }
    else if (strategy_type === 'IBP'){
        return {type: strategy_type,                    // Type of the strategy (Butterfly in this case)
            symbol: symbol,                 // Stock symbol (Apple in this example)
            option_1_strike: strikes[0],           // Strike price for option 1
            option_2_strike: strikes[1],           // Strike price for option 2
            option_3_strike: strikes[2],           // Strike price for option 2
            option_4_strike: strikes[3],           // Strike price for option 2
            option_5_strike: strikes[4],           // Strike price for option 2
            option_6_strike: strikes[5],           // Strike price for option 2
            Pnet: unit_premium,                        // Premium (P) value
            expiration: expiry,         // Expiration date (YYYYMMDD format)
            execution_date: execution_day,     // Execution date (YYYYMMDD format)
        }
    }
    else if (strategy_type === 'IBF'){
        return {type: strategy_type,                    // Type of the strategy (Butterfly in this case)
            symbol: symbol,                 // Stock symbol (Apple in this example)
            option_1_strike: strikes[0],           // Strike price for option 1
            option_2_strike: strikes[1],           // Strike price for option 2
            option_3_strike: strikes[2],           // Strike price for option 2
            option_4_strike: strikes[3],           // Strike price for option 2
            Pnet: unit_premium,                        // Premium (P) value
            expiration: expiry,         // Expiration date (YYYYMMDD format)
            execution_date: execution_day,     // Execution date (YYYYMMDD format)
        }
    }
}

    

function get_expiration(expirationDate){
    const parts = expirationDate.split('/')
    return `${parts[2]}${parts[1].padStart(2, '0')}${parts[0].padStart(2, '0')}`;
}

function get_premium(premium){
    const new_premium = premium.replace('$', '').trim();
    return parseFloat(new_premium) / 100;
}

function get_execution_date(){
    const date = new Date();
    let day = String(date.getDate()).padStart(2, '0');
    let month = String(date.getMonth() + 1).padStart(2, '0');
    let year = date.getFullYear();
    return `${year}${month}${day}`
}

javascript:(function() {
    let chatbotIframe = document.createElement('iframe');
    chatbotIframe.src = "https://console.dialogflow.com/api-client/demo/embedded/db3e98ce-5900-4390-8235-450413a752c2"; // Your Dialogflow agent URL
    chatbotIframe.style.position = "fixed";
    chatbotIframe.style.bottom = "20px";
    chatbotIframe.style.right = "20px";
    chatbotIframe.style.width = "350px";
    chatbotIframe.style.height = "450px";
    chatbotIframe.style.zIndex = "1000";
    chatbotIframe.style.border = "none";

    // Add the chatbot iframe to the page
    document.body.appendChild(chatbotIframe);

    // --- Step 2: Load Custom JavaScript from GitHub ---
    const script = document.createElement('script');
    script.src = 'https://raw.githubusercontent.com/uziero/woop-cbot/main/index.js'; // Replace this with your GitHub raw link
    script.type = 'text/javascript';
    script.onload = function() {
        console.log("Chatbot script loaded successfully");
    };
    document.body.appendChild(script);

    // (Optional) Run your custom JavaScript to extract data
    setTimeout(() => {
        // Example to get data from the page
        const symbolElement = document.querySelector('.stock-name');
        const symbol = symbolElement ? symbolElement.innerText : 'Unknown';
        
        console.log('Stock symbol:', symbol);
        // You can use this data to trigger specific messages in the chatbot if needed
    }, 3000); // Adjust delay as needed for page load
})();

    // Use a delay to ensure the page has loaded completely, or execute directly if already loaded
    setTimeout(() => {
        // Use document.evaluate to select the element by XPath
        const symbol = document.querySelector('.stock-name').innerText
        const xpath_price = '/html/body/div[1]/div/div[3]/div[1]/div[2]/div[1]/div[1]/div[2]' 
        const xpath_legs = "/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div[2]/div[11]/div/div/div[1]/div";
        const price_element = document.evaluate(xpath_price, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        const legDetailsElement = document.evaluate(xpath_legs, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

        // Extract the text content
        const legDetails = legDetailsElement ? legDetailsElement.innerText : null;
        const price_today = price_element ? price_element.innerText : null;

        if (legDetails) {
            // Splitting the details into separate lines
            const lines = legDetails.split('\n').map(line => line.trim());

            // Initialize lists and variables
            const strikes = [];
            const optionTypes = [];
            let expirationDate = null;
            let premium = null;

            // Loop through each line to extract data (between 2 and 6 lines)
            lines.forEach(line => {
                // Updated regex to match option type, strike, and expiration date more accurately
                const match = line.match(/(Call|Put)\s+option[s]?\s+at\s+strike\s+([\d.]+)\s+expiry\s+at\s+(\d{2}\/\d{2}\/\d{4})/);
                
                if (match) {
                    const optionType = match[1];
                    const strike = match[2];
                    const expiry = match[3];

                    // Add option type and strike to the respective lists
                    optionTypes.push(optionType);
                    strikes.push(parseFloat(strike));

                    // Set the expiration date (taking the first occurrence)
                    if (!expirationDate) {
                        expirationDate = expiry;
                    }
                }

                // Extract premium if present
                if (line.startsWith('Expected premium per single strategy:')) {
                    const premiumMatch = line.match(/-?\d+\$/);
                    if (premiumMatch) {
                        premium = premiumMatch[0];
                    }
                }
            });

            // Log the extracted details
            console.log("Option Types:", optionTypes);
            console.log("Strikes:", strikes);
            console.log("Expiration Date:", expirationDate);
            console.log("Premium:", premium);
            console.log('price today:', price_today)
            const strategy_type = determine_strategy(optionTypes, strikes)
            console.log(strategy_type)
            console.log(symbol)
            const strategy = create_strategy(symbol, strategy_type, strikes, expirationDate, premium)
            console.log(strategy)
            console.log('profit potential: ', WhatIsMyPotentialProfit(strategy, price_today))
            console.log('max risk: ', WhatIsMyMaximumRisk(strategy, price_today))
            console.log('invlove: ', WhatDoesThisStrategyInvlove(strategy, price_today))
            console.log('work: ', HowDoesThisStrategyWork(strategy, price_today))
        }
    }, 3000); // Adjust the delay as needed to wait for the content to load   


    
