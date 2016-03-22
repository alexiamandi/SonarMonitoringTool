package alex.iamandi.SonarMonitoringTool;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends CrudRepository<Project, ProjectPK> {

	List<Project> findByName(String name);

	Project findById(Long i);

}
