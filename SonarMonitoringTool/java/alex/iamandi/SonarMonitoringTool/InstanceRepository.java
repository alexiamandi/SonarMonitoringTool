package alex.iamandi.SonarMonitoringTool;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface InstanceRepository extends CrudRepository<Instance, Long> {

	Instance findByLink(String uRL);

	

}
