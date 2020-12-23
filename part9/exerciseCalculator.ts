interface Result {
	numberOfDays: number,
	numberOfTrainingDays: number,
	isTargetReached: boolean,
	rating: number,
	description: string,
	goal: number,
	averageTime: number

}

interface calVariable {
	goal: number,
	array: Array<string>
}

const parseArguments = (args: Array<string>): calVariable => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args.slice(3)))) {
    return {
      goal: Number(args[2]),
      array: args.slice(3)
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (daysWithHoursOfTraining: number[], goal: number): Result => {
	const numberOfDays = daysWithHoursOfTraining.length;
	const numberOfTrainingDays = daysWithHoursOfTraining.filter(hour => hour !== 0).length;
	const totalHour = daysWithHoursOfTraining.reduce((acc, index) => acc + index, 0);
	const averageTime = totalHour / numberOfDays;
	const isTargetReached = averageTime >= goal;
	const percentageRating = (averageTime / goal) * 100;
	let rating;
	let description;
	if (percentageRating >= 100) {
		rating = 3;
		description = "Great, you have reached your goal!";
	} else if (percentageRating >= 75 && percentageRating < 100) {
		rating = 2;
		description = "You are doing great";
	} else if (percentageRating >= 50 && percentageRating < 75) {
		rating = 2;
		description = "keep moving you have already crossed the half line";
	} else {
		rating = 1;
		description = "Opps take a rest and come back stronger";
	}	



	return {
		numberOfDays,
		numberOfTrainingDays,
		averageTime,
		isTargetReached,
		goal,
		description,
		rating
	};
};
const { goal, array } = parseArguments(process.argv);
console.log(calculateExercises(array.map(number => Number(number)), goal));