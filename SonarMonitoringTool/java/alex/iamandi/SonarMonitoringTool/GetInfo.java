package alex.iamandi.SonarMonitoringTool;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.logging.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class GetInfo {

	@Autowired
	private ProjectRepository projectRepository;

	@Autowired
	private InstanceRepository instanceRepository;

	private static final Logger LOGGER = Logger.getLogger("myLogger");
	public static final String Eroare = "Eroare";

	@Scheduled(fixedRate = 10000)
	public void refreshProjects() {
		System.out.println(">>>New parsing!");
		List<Instance> instances = (List<Instance>) instanceRepository.findAll();
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		if (instances.size() == 0) {
			System.out.println(">>>>>No URLs");
		} else
			for (Instance instance : instances) {
				List<Project> newProjects = null;
				try {

					newProjects = mapper.readValue(new URL(instance.getLink() + "api/resources?metrics=" + "lines,"
							+ "complexity," + "class_complexity," + "file_complexity," + "function_complexity,"
							+ "comment_lines," + "comment_lines_density," + "duplicated_blocks," + "duplicated_files,"
							+ "duplicated_lines," + "duplicated_lines_density," + "new_violations,"
							+ "new_blockers_violations," + "new_critical_violations," + "new_major_violations,"
							+ "new_minor_violations," + "new_info_violations," + "violations," + "blockers_violations,"
							+ "critical_violations," + "major_violations," + "minor_violations," + "info_violations,"
							+ "false_positive_issues," + "open_issues," + "confirmed_issues," + "reopened_issues,"
							+ "weighted_violations," + "violations_density," + "alert_status," + "quality_gate_details,"
							+ "accessors," + "classes," + "directories," + "files," + "generated_lines,"
							+ "generated_ncloc," + "cobol_inside_ctrlflow_statements," + "ncloc,"
							+ "cobol_data_division_ncloc," + "cobol_procedure_division_ncloc," + "functions,"
							+ "cobol_outside_ctrlflow_statements," + "projects," + "public_api," + "statements,"
							+ "sqale_index," + "sqale_debt_ratio," + "new_sqale_debt_ratio," + "branch_coverage,"
							+ "new_branch_coverage," + "branch_coverage_hits_data," + "conditions_by_line,"
							+ "covered_conditions_by_line," + "coverage," + "new_coverage," + "line_coverage,"
							+ "new_line_coverage," + "coverage_line_hits_data," + "lines_to_cover,"
							+ "new_lines_to_cover," + "skipped_tests," + "uncovered_conditions,"
							+ "new_uncovered_conditions," + "uncovered_lines," + "new_uncovered_lines," + "tests,"
							+ "test_execution_time," + "test_errors," + "test_failures," + "test_success_density,"
							+ "&format=json"),
							mapper.getTypeFactory().constructCollectionType(List.class, Project.class));
					for (Project project : newProjects) {
						project.setURL(instance.getLink());
					}
				} catch (MalformedURLException e) {
					LOGGER.log(null, Eroare, e);
				} catch (JsonGenerationException e) {
					LOGGER.log(null, Eroare, e);
				} catch (JsonMappingException e) {
					LOGGER.log(null, Eroare, e);
				} catch (IOException e) {
					LOGGER.log(null, Eroare, e);
				}

				for (Project project : newProjects) {
					Project oldProject = projectRepository.findById(project.getId());
					if (oldProject != null) {
						int nrOfMsrs = oldProject.getAllMsr().size();
						for (Metric metric : project.getAllMsr()) {
							metric.setDate(project.getDate());
						}
						oldProject.addMetrics(project.getAllMsr());
						oldProject.setDate(project.getDate());
						projectRepository.save(oldProject);
						if (oldProject.getAllMsr().size() != nrOfMsrs) {
							System.out.println(
									"New MSRs added. Project: " + oldProject.getId() + "." + oldProject.getName());
						} else {

						}
					} else {

						projectRepository.save(project);
						System.out.println("Project added at refresh");
					}
				}
			}

	}

	public void listOfProjects(Instance instance) {
		ObjectMapper mapper = new ObjectMapper();
		mapper.disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES);
		try {
			List<Project> projects;
			projects = mapper.readValue(new URL(instance.getLink() + "api/resources?metrics=" + "lines," + "complexity,"
					+ "class_complexity," + "file_complexity," + "function_complexity," + "comment_lines,"
					+ "comment_lines_density," + "duplicated_blocks," + "duplicated_files," + "duplicated_lines,"
					+ "duplicated_lines_density," + "new_violations," + "new_blockers_violations,"
					+ "new_critical_violations," + "new_major_violations," + "new_minor_violations,"
					+ "new_info_violations," + "violations," + "blockers_violations," + "critical_violations,"
					+ "major_violations," + "minor_violations," + "info_violations," + "false_positive_issues,"
					+ "open_issues," + "confirmed_issues," + "reopened_issues," + "weighted_violations,"
					+ "violations_density," + "alert_status," + "quality_gate_details," + "accessors," + "classes,"
					+ "directories," + "files," + "generated_lines," + "generated_ncloc,"
					+ "cobol_inside_ctrlflow_statements," + "ncloc," + "cobol_data_division_ncloc,"
					+ "cobol_procedure_division_ncloc," + "functions," + "cobol_outside_ctrlflow_statements,"
					+ "projects," + "public_api," + "statements," + "sqale_index," + "sqale_debt_ratio,"
					+ "new_sqale_debt_ratio," + "branch_coverage," + "new_branch_coverage,"
					+ "branch_coverage_hits_data," + "conditions_by_line," + "covered_conditions_by_line," + "coverage,"
					+ "new_coverage," + "line_coverage," + "new_line_coverage," + "coverage_line_hits_data,"
					+ "lines_to_cover," + "new_lines_to_cover," + "skipped_tests," + "uncovered_conditions,"
					+ "new_uncovered_conditions," + "uncovered_lines," + "new_uncovered_lines," + "tests,"
					+ "test_execution_time," + "test_errors," + "test_failures," + "test_success_density,"
					+ "&format=json"), mapper.getTypeFactory().constructCollectionType(List.class, Project.class));
			for (Project project : projects) {
				if (project.getAllMsr() != null) {
					for (Metric metric : project.getAllMsr()) {
						metric.setDate(project.getDate());
					}
					project.setURL(instance.toString());
				}
			}
			projectRepository.save(projects);

		} catch (MalformedURLException e) {
			LOGGER.log(null, Eroare, e);
		} catch (JsonGenerationException e) {
			LOGGER.log(null, Eroare, e);
		} catch (JsonMappingException e) {
			LOGGER.log(null, Eroare, e);
		} catch (IOException e) {
			LOGGER.log(null, Eroare, e);
		}

	}

}
