package alex.iamandi.SonarMonitoringTool;


import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MetricRepository extends CrudRepository<Metric, Long> {

	List<Metric> findByProject(Project project);

	

}
