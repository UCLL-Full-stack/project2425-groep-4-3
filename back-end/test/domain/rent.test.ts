import { set } from "date-fns";
import { Rent } from "../../model/Rent";


const startDate = set(new Date(),{hours : 3,minutes: 34})
const endDate = set(new Date(),{hours : 5,minutes: 30})

const rent = new Rent({startDate:startDate,endDate:endDate,cost:12})

test('given: valid values for Rent, when: Rent is created, then: Rent is created with those values', () => {
    //given

    //when
    const newRent = new Rent({startDate,endDate,cost:12});

    //then
    expect(newRent.getStartDate()).toEqual(startDate);
    expect(newRent.getEndDate()).toEqual(endDate);
    expect(newRent.getCost()).toEqual(12);
   
});