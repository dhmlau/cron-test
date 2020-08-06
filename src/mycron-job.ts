import {CronJob, cronJob} from '@loopback/cron';
import {repository} from '@loopback/repository';
import {Customer} from './models';
import {CustomerRepository} from './repositories';

@cronJob()
export class MyCronJob extends CronJob {
  constructor(
    @repository(CustomerRepository)
    public customerRepository: CustomerRepository,
  ) {
    super({
      name: 'job-B',
      onTick: async () => {
        // do the work
        // let customers: Customer[] = await customerRepository.find();
        let customers: Customer[] = await this.findAllCustomer();
        console.log(new Date());
        console.log(customers);
      },
      cronTime: '*/10 * * * * *',
      start: false,
    });
  }

  async findAllCustomer(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
